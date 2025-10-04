import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, MapPin, Clock, Users, Calendar, Archive, 
  Heart, Share2, Download, Play, Volume2, Image as ImageIcon 
} from "lucide-react";
import monastery1 from "@/assets/monastery-1.jpg";
import monastery2 from "@/assets/monastery-2.jpg";
import { useNavigate } from "react-router-dom";

// Mock data - would come from API/database
const monasteryDetails = {
  rumtek: {
    name: "Rumtek Monastery",
    subtitle: "The Dharma Chakra Centre",
    location: "East Sikkim, 24km from Gangtok",
    founded: "1740 AD",
    tradition: "Kagyu",
    description:
      "Rumtek Monastery, officially known as the Dharma Chakra Centre, is the largest monastery in Sikkim and serves as the seat of the Karmapa. This magnificent structure is a perfect replica of the original Tsurphu Monastery in Tibet and houses some of the most precious Buddhist artifacts and manuscripts.",
    image: monastery1,
    gallery: [monastery1, monastery2, monastery1, monastery2],
    hasVirtualTour: true,
    upcomingEvents: [
      {
        name: "Losar Festival",
        date: "February 15, 2024",
        description: "Tibetan New Year celebration",
      },
      {
        name: "Buddha Purnima",
        date: "May 23, 2024",
        description: "Birth anniversary of Buddha",
      },
      {
        name: "Cham Dance",
        date: "June 10, 2024",
        description: "Sacred masked dance performance",
      },
    ],
    artifacts: [
      {
        name: "Golden Stupa",
        description: "Contains relics of the 16th Karmapa",
        century: "20th Century",
      },
      {
        name: "Thangka Collection",
        description: "Rare Buddhist paintings",
        century: "18th-19th Century",
      },
      {
        name: "Manuscripts",
        description: "Ancient Buddhist texts",
        century: "17th Century",
      },
    ],
    architecture: {
      style: "Traditional Tibetan",
      levels: 3,
      mainStructures: [
        "Main prayer hall",
        "Golden stupa room",
        "Monks' quarters",
        "Library",
      ],
      specialFeatures: [
        "Intricate murals",
        "Golden roof",
        "Prayer wheels",
        "Monastery courtyard",
      ],
    },
    visitInfo: {
      openHours: "6:00 AM - 6:00 PM",
      entryFee: "₹20 for Indians, ₹50 for foreigners",
      bestTime: "October to March",
      nearbyAttractions: ["Lingdum Monastery", "Gangtok city", "Tsomgo Lake"],
    },
  },
};

const MonasteryDetail = () => {
  const { id } = useParams();
  const monastery = monasteryDetails[id as keyof typeof monasteryDetails];

  const navigate = useNavigate(); // keep if you’ll need it for other internal routes

  if (!monastery) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-bold monastery-heading mb-4 text-gradient-gold">
              Monastery Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The monastery you're looking for doesn't exist in our collection.
            </p>
            <Button asChild>
              <Link to="/monasteries">View All Monasteries</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <img
          src={monastery.image}
          alt={monastery.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-secondary/90 backdrop-blur">
                  {monastery.tradition} Tradition
                </Badge>
                {monastery.hasVirtualTour && (
                  <Badge className="bg-primary/90 backdrop-blur">
                    <Camera className="h-3 w-3 mr-1" />
                    360° Tour Available
                  </Badge>
                )}
              </div>

              <h1 className="text-5xl font-bold monastery-heading text-white mb-2">
                {monastery.name}
              </h1>
              <p className="text-xl text-white/90 mb-4">{monastery.subtitle}</p>

              <div className="flex items-center gap-6 text-white/80 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{monastery.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Founded {monastery.founded}</span>
                </div>
              </div>

              <div className="flex gap-4">
                {monastery.hasVirtualTour && (
                  <Button
                    size="lg"
                    className="bg-gradient-monastery hover:opacity-90"
                    onClick={() =>
                      (window.location.href =
                        "http://localhost:8080/tours/rumtek")
                    }
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Virtual Tour
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
              <TabsTrigger value="visit">Visit</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Description */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="monastery-border">
                    <CardContent className="p-8">
                      <h2 className="text-3xl font-bold monastery-heading mb-4">
                        About the Monastery
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                        {monastery.description}
                      </p>

                      <h3 className="text-xl font-semibold mb-4">
                        Architecture & Design
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Style
                          </div>
                          <div className="font-medium">
                            {monastery.architecture.style}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Levels
                          </div>
                          <div className="font-medium">
                            {monastery.architecture.levels} floors
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Main Structures</h4>
                          <div className="flex flex-wrap gap-2">
                            {monastery.architecture.mainStructures.map(
                              (structure, index) => (
                                <Badge key={index} variant="outline">
                                  {structure}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Special Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {monastery.architecture.specialFeatures.map(
                              (feature, index) => (
                                <Badge key={index} variant="secondary">
                                  {feature}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Stats */}
                  <Card className="monastery-border">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Quick Information</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tradition</span>
                          <span className="font-medium">
                            {monastery.tradition}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Founded</span>
                          <span className="font-medium">
                            {monastery.founded}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Events</span>
                          <span className="font-medium">
                            {monastery.upcomingEvents.length} upcoming
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Artifacts</span>
                          <span className="font-medium">
                            {monastery.artifacts.length}+ items
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Audio Guide */}
                  <Card className="monastery-border">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Volume2 className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold">Audio Guide</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Listen to detailed commentary about the monastery's
                        history and significance.
                      </p>

                      {/* Audio Player */}
                      <audio controls className="w-full mt-2">
                        <source
                          src="/public/data/audio/rumtek-guide.mp3"
                          type="audio/mpeg"
                        />
                        Your browser does not support the audio element.
                      </audio>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Gallery Tab */}
            <TabsContent value="gallery">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold monastery-heading mb-2">
                  Photo Gallery
                </h2>
                <p className="text-muted-foreground">
                  Explore the monastery through high-resolution images
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {monastery.gallery.map((image, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden group cursor-pointer hover:monastery-glow transition-all duration-300"
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={image}
                        alt={`${monastery.name} view ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Events Tab */}
            <TabsContent value="events">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold monastery-heading mb-2">
                  Upcoming Events
                </h2>
                <p className="text-muted-foreground">
                  Join us for these special occasions and festivals
                </p>
              </div>

              <div className="space-y-6">
                {monastery.upcomingEvents.map((event, index) => (
                  <Card key={index} className="monastery-border">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Calendar className="h-5 w-5 text-primary" />
                            <h3 className="text-xl font-semibold">
                              {event.name}
                            </h3>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {event.description}
                          </p>
                          <p className="text-sm font-medium text-primary">
                            {event.date}
                          </p>
                        </div>
                        <Button variant="outline">Learn More</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Artifacts Tab */}
            <TabsContent value="artifacts">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold monastery-heading mb-2">
                  Sacred Artifacts
                </h2>
                <p className="text-muted-foreground">
                  Discover the treasures housed within this monastery
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {monastery.artifacts.map((artifact, index) => (
                  <Card key={index} className="monastery-border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-monastery flex items-center justify-center flex-shrink-0">
                          <Archive className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">
                            {artifact.name}
                          </h3>
                          <p className="text-muted-foreground mb-2">
                            {artifact.description}
                          </p>
                          <Badge variant="outline">{artifact.century}</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Visit Tab */}
            <TabsContent value="visit">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold monastery-heading mb-2">
                  Plan Your Visit
                </h2>
                <p className="text-muted-foreground">
                  Everything you need to know for your monastery visit
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="monastery-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Visiting Hours & Fees
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Opening Hours
                        </div>
                        <div className="font-medium">
                          {monastery.visitInfo.openHours}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Entry Fee
                        </div>
                        <div className="font-medium">
                          {monastery.visitInfo.entryFee}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">
                          Best Time to Visit
                        </div>
                        <div className="font-medium">
                          {monastery.visitInfo.bestTime}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="monastery-border">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Nearby Attractions
                    </h3>
                    <div className="space-y-3">
                      {monastery.visitInfo.nearbyAttractions.map(
                        (attraction, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                            <span>{attraction}</span>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-monastery text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold monastery-heading mb-4">
            Explore More Monasteries
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Continue your spiritual journey by discovering other sacred sites in
            Sikkim's monastery network.
          </p>

          <Button size="lg" variant="secondary" asChild>
            <Link to="/monasteries">View All Monasteries</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default MonasteryDetail;
