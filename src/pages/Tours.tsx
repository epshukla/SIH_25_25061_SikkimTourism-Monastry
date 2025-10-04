import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar, Search, Camera, Play } from "lucide-react";

interface Monastery {
  id: string;
  name: string;
  location: string;
  description: string;
  thumbnail: string;
  tradition: string;
  founded: string;
}

const Tours = () => {
  const [monasteries, setMonasteries] = useState<Monastery[]>([]);
  const [filteredMonasteries, setFilteredMonasteries] = useState<Monastery[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // For Imagine Your Trip Section
  const [thinking, setThinking] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const handlePlayVideo = () => {
    setThinking(true);
    setShowVideo(false);

    setTimeout(() => {
      setThinking(false);
      setShowVideo(true);
    }, 2000);
  };

  useEffect(() => {
    const loadMonasteries = async () => {
      try {
        const response = await fetch('/data/monasteries.json');
        const data = await response.json();
        setMonasteries(data);
        setFilteredMonasteries(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading monasteries:', error);
        setLoading(false);
      }
    };

    loadMonasteries();
  }, []);

  useEffect(() => {
    const filtered = monasteries.filter(monastery =>
      monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monastery.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monastery.tradition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMonasteries(filtered);
  }, [searchTerm, monasteries]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-pulse text-2xl monastery-heading">Loading Virtual Tours...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-monastery text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold monastery-heading mb-6">
              Virtual Tours
            </h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Explore Sikkim's sacred monasteries through immersive 360° virtual tours. 
              Experience the beauty and spirituality of these ancient sites from anywhere in the world.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span>360° Views</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Interactive Exploration</span>
              </div>
              <div className="flex items-center gap-2">
                <Play className="h-4 w-4" />
                <span>Guided Experience</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Tours */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search by monastery name, location, or tradition..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg monastery-border"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-muted-foreground">
              Showing {filteredMonasteries.length} virtual tour{filteredMonasteries.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Tours Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMonasteries.map((monastery) => (
              <Card key={monastery.id} className="monastery-border overflow-hidden group hover:monastery-glow transition-all duration-300">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={monastery.thumbnail}
                    alt={monastery.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary/90 backdrop-blur">
                      <Camera className="h-3 w-3 mr-1" />
                      360° Tour
                    </Badge>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur rounded-full p-4">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold monastery-heading mb-2">
                        {monastery.name}
                      </h3>
                      <div className="flex items-center text-muted-foreground mb-3">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{monastery.location}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {monastery.description}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex gap-2">
                        <Badge variant="outline">{monastery.tradition}</Badge>
                        <Badge variant="secondary" className="text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {monastery.founded}
                        </Badge>
                      </div>
                    </div>

                    <Button 
                      asChild 
                      className="w-full bg-gradient-monastery hover:opacity-90"
                    >
                      <Link to={`/tours/${monastery.id}`}>
                        <Play className="h-4 w-4 mr-2" />
                        Start Virtual Tour
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMonasteries.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                <Search className="h-16 w-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No tours found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or explore all available tours.
              </p>
              <Button 
                variant="outline" 
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Imagine Your Trip Section */}
      <section className="py-16 bg-gradient-monastery text-primary-foreground">
  <div className="container mx-auto px-4 text-center">
    <h2 className="text-3xl font-bold mb-4">Imagine Your Trip</h2>
    <p className="mb-8 text-lg opacity-90">
      Upload an image to visualize your personalized monastery journey!
    </p>

    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        className="bg-white text-black px-4 py-2 rounded-md"
      />
      <button
        onClick={handlePlayVideo}
        className="bg-white text-purple-700 px-6 py-3 rounded-md font-semibold hover:opacity-90 transition"
      >
        Imagine & Play
      </button>
    </div>

    {thinking && (
      <p className="mt-6 text-xl animate-pulse">
        Thinking about your trip...
      </p>
    )}

    {showVideo && (
      <div className="mt-8">
        <video
          src="/data/videos/spm.mp4"
          controls
          autoPlay
          className="mx-auto rounded-md shadow-lg max-w-full"
        />
      </div>
    )}
  </div>
</section>


      {/* CTA Section */}
      <section className="py-16 bg-gradient-monastery text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold monastery-heading mb-4">
            Explore More Heritage Content
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Discover digitized manuscripts, artifacts, and cultural treasures in our comprehensive archives.
          </p>
          
          <Button 
            size="lg" 
            variant="secondary" 
            asChild
          >
            <Link to="/archives">
              Visit Digital Archives
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Tours;
