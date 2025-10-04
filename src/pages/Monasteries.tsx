import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { MonasteryCard } from "@/components/MonasteryCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin, Calendar, Camera, Users } from "lucide-react";
import monastery1 from "@/assets/monastery-1.jpg";
import monastery2 from "@/assets/monastery-2.jpg";

const monasteries = [
  {
    id: "rumtek",
    name: "Rumtek Monastery",
    location: "East Sikkim",
    founded: "1740 AD",
    tradition: "Kagyu",
    image: monastery1,
    description: "The largest monastery in Sikkim and seat of the Karmapa, featuring exquisite murals and ancient manuscripts.",
    hasVirtualTour: true,
    upcomingEvents: 3,
    artifacts: 247,
  },
  {
    id: "pemayangtse",
    name: "Pemayangtse Monastery",
    location: "West Sikkim", 
    founded: "1705 AD",
    tradition: "Nyingma",
    image: monastery2,
    description: "One of the oldest monasteries in Sikkim, known for its seven-tiered wooden sculpture and panoramic views.",
    hasVirtualTour: true,
    upcomingEvents: 1,
    artifacts: 189,
  },
  {
    id: "tashiding",
    name: "Tashiding Monastery",
    location: "West Sikkim",
    founded: "1717 AD", 
    tradition: "Nyingma",
    image: monastery1,
    description: "Built on a heart-shaped hilltop, this sacred site offers breathtaking views and spiritual significance.",
    hasVirtualTour: false,
    upcomingEvents: 2,
    artifacts: 156,
  },
  {
    id: "enchey",
    name: "Enchey Monastery",
    location: "East Sikkim",
    founded: "1909 AD",
    tradition: "Nyingma",
    image: monastery2,
    description: "Located in Gangtok, this monastery is famous for its annual masked dance festival and spiritual teachings.",
    hasVirtualTour: true,
    upcomingEvents: 1,
    artifacts: 98,
  },
  {
    id: "dubdi",
    name: "Dubdi Monastery",
    location: "West Sikkim",
    founded: "1701 AD",
    tradition: "Nyingma",
    image: monastery1,
    description: "Sikkim's first monastery, nestled in dense forests and known for its peaceful meditation retreats.",
    hasVirtualTour: false,
    upcomingEvents: 0,
    artifacts: 124,
  },
  {
    id: "phodong",
    name: "Phodong Monastery",
    location: "North Sikkim",
    founded: "1740 AD",
    tradition: "Kagyu",
    image: monastery2,
    description: "Rebuilt after an earthquake, this monastery maintains beautiful frescoes and traditional architecture.",
    hasVirtualTour: true,
    upcomingEvents: 2,
    artifacts: 167,
  }
];

const traditions = ["All", "Nyingma", "Kagyu", "Gelug", "Sakya"];
const locations = ["All Locations", "East Sikkim", "West Sikkim", "North Sikkim", "South Sikkim"];

const Monasteries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTradition, setSelectedTradition] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");

  const filteredMonasteries = monasteries.filter((monastery) => {
    const matchesSearch = monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         monastery.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTradition = selectedTradition === "All" || monastery.tradition === selectedTradition;
    const matchesLocation = selectedLocation === "All Locations" || monastery.location === selectedLocation;
    
    return matchesSearch && matchesTradition && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header Section */}
      <section className="py-20 bg-gradient-himalayan">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold monastery-heading mb-6">
              <span className="text-gradient-gold">Sacred Monasteries</span>
              <br />
              <span className="text-3xl font-medium text-foreground">of Sikkim</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our comprehensive collection of Sikkim's monasteries, each with its unique 
              history, architectural beauty, and spiritual significance.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardContent className="p-4">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient-gold">28</div>
                <div className="text-sm text-muted-foreground">Monasteries</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Camera className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient-gold">15</div>
                <div className="text-sm text-muted-foreground">Virtual Tours</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient-gold">12</div>
                <div className="text-sm text-muted-foreground">Active Events</div>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-4">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold text-gradient-gold">1,247</div>
                <div className="text-sm text-muted-foreground">Artifacts</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background sticky top-16 z-40 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search monasteries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              
              {/* Tradition Filter */}
              <div className="flex gap-1">
                {traditions.map((tradition) => (
                  <Button
                    key={tradition}
                    variant={selectedTradition === tradition ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTradition(tradition)}
                    className="text-xs"
                  >
                    {tradition}
                  </Button>
                ))}
              </div>

              {/* Location Filter */}
              <div className="flex gap-1">
                {locations.map((location) => (
                  <Button
                    key={location}
                    variant={selectedLocation === location ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLocation(location)}
                    className="text-xs hidden md:inline-flex"
                  >
                    {location === "All Locations" ? "All" : location.replace(" Sikkim", "")}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedTradition !== "All" || selectedLocation !== "All Locations" || searchTerm) && (
            <div className="flex gap-2 mt-4">
              {searchTerm && (
                <Badge variant="secondary">
                  Search: {searchTerm}
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="ml-2 text-xs hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedTradition !== "All" && (
                <Badge variant="secondary">
                  {selectedTradition}
                  <button 
                    onClick={() => setSelectedTradition("All")}
                    className="ml-2 text-xs hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {selectedLocation !== "All Locations" && (
                <Badge variant="secondary">
                  {selectedLocation}
                  <button 
                    onClick={() => setSelectedLocation("All Locations")}
                    className="ml-2 text-xs hover:text-foreground"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Monasteries Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredMonasteries.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏔️</div>
              <h3 className="text-2xl font-semibold mb-2">No monasteries found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTradition("All");
                  setSelectedLocation("All Locations");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {filteredMonasteries.length} Monasteries Found
                  </h2>
                  <p className="text-muted-foreground">
                    Discover the spiritual heritage of Sikkim
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMonasteries.map((monastery) => (
                  <MonasteryCard key={monastery.id} {...monastery} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-monastery flex items-center justify-center">
                <span className="text-primary-foreground text-sm font-bold">M</span>
              </div>
              <span className="text-2xl font-bold monastery-heading text-gradient-gold">
                Monastery360
              </span>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Preserving and sharing Sikkim's spiritual heritage through digital innovation 
              and community collaboration.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Monasteries;