import { useEffect, useRef } from "react";

declare global {
  interface Window {
    initMiniMap: () => void;
    google: any;
  }
}

interface MiniMapProps {
  lat: number;
  lng: number;
  name: string;
}

const MiniMap: React.FC<MiniMapProps> = ({ lat, lng, name }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<any[]>([]);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBh3nzQxJlX2cY0Ad0rXTgc9-5p59EbMoU&libraries=places&callback=initMiniMap";
      script.async = true;
      document.body.appendChild(script);

      window.initMiniMap = () => {
        if (mapRef.current) {
          initMap(mapRef.current);
        }
      };
    } else {
      if (mapRef.current) {
        initMap(mapRef.current);
      }
    }
  }, [lat, lng, name]);

  const initMap = (container: HTMLDivElement) => {
    const center = { lat, lng };

    const map = new window.google.maps.Map(container, {
      center,
      zoom: 14,
      fullscreenControl: true, // ✅ enable fullscreen
    });

    mapInstanceRef.current = map;

    // --- Current monastery marker (Blue) ---
    const monasteryMarker = new window.google.maps.Marker({
      map,
      position: center,
      title: name,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
      },
    });

    const monasteryInfo = new window.google.maps.InfoWindow({
      content: `<strong>${name}</strong><br>Current Tour`,
    });
    monasteryMarker.addListener("click", () => {
      monasteryInfo.open(map, monasteryMarker);
    });

    // --- Famous nearby spots (Red) ---
    const service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(
      {
        location: center,
        radius: 7000,
        type: "tourist_attraction",
      },
      (results: any, status: any) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          results.slice(0, 10).forEach((place: any) => {
            if (!place.geometry?.location) return;

            const marker = new window.google.maps.Marker({
              map,
              position: place.geometry.location,
              title: place.name,
              icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
              },
            });

            const infowindow = new window.google.maps.InfoWindow({
              content: `<strong>${place.name}</strong><br>${place.vicinity || ""}`,
            });

            marker.addListener("click", () => {
              infowindow.open(map, marker);
            });

            markersRef.current.push(marker);
          });
        }
      }
    );

    // --- Listen for fullscreen exit ---
    document.addEventListener("fullscreenchange", () => {
      if (!document.fullscreenElement && mapInstanceRef.current) {
        // user exited fullscreen → reset to monastery
        mapInstanceRef.current.setCenter(center);
        mapInstanceRef.current.setZoom(14);
      }
    });
  };

  return (
    <div
      ref={mapRef}
      className="absolute bottom-4 right-4 border rounded shadow-lg"
      style={{ width: "220px", height: "220px", zIndex: 20 }}
    />
  );
};

export default MiniMap;
