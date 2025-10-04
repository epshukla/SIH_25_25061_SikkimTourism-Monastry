import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { MonasteryCard } from "@/components/MonasteryCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Users, Calendar, Archive, Camera, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import monastery1 from "@/assets/monastery-1.jpg";
import monastery2 from "@/assets/monastery-2.jpg";

const featuredMonasteries = [
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
];

const stats = [
  { label: "Monasteries", value: "28", icon: MapPin },
  { label: "Virtual Tours", value: "15", icon: Camera },
  { label: "Digital Artifacts", value: "1,247", icon: Archive },
  { label: "Community Members", value: "3,500+", icon: Users },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-monastery flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold monastery-heading text-gradient-gold mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Monasteries */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold monastery-heading mb-4">
              <span className="text-gradient-gold">Featured Monasteries</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the spiritual heart of Sikkim through our carefully curated collection 
              of ancient monasteries and their digital heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredMonasteries.map((monastery) => (
              <MonasteryCard key={monastery.id} {...monastery} />
            ))}
          </div>

          <div className="text-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link to="/monasteries" className="flex items-center gap-2">
                View All Monasteries
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-gradient-himalayan">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold monastery-heading mb-6">
                Immersive Cultural Experience
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Step inside sacred spaces with our 360° virtual tours, explore ancient manuscripts 
                through high-resolution digital archives, and participate in live cultural events 
                from anywhere in the world.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Camera className="h-4 w-4" />
                  </div>
                  <span>360° Virtual Reality Tours</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Archive className="h-4 w-4" />
                  </div>
                  <span>High-Resolution Digital Archives</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <span>Live Cultural Events & Festivals</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-monastery hover:opacity-90"
                asChild
              >
                <Link to="/about">
                  Learn More About Our Mission
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="monastery-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-sunrise flex items-center justify-center flex-shrink-0">
                      <Heart className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Cultural Preservation</h3>
                      <p className="text-muted-foreground">
                        Digitizing and preserving Sikkim's spiritual heritage for future generations 
                        through cutting-edge technology and community collaboration.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="monastery-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-sacred flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Community Driven</h3>
                      <p className="text-muted-foreground">
                        Local monks, historians, and community members contribute stories, 
                        artifacts, and oral traditions to enrich our digital collection.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-monastery text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold monastery-heading mb-4">
            Begin Your Spiritual Journey
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of visitors, researchers, and spiritual seekers in exploring 
            Sikkim's sacred monasteries through our immersive digital platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 h-auto"
              asChild
            >
              <Link to="/tours">
                Start Virtual Tour
              </Link>
            </Button>
            <Button 
  size="lg" 
  variant="outline" 
  className="border-primary-foreground/30 text-primary-foreground bg-white/10 text-lg px-8 py-6 h-auto backdrop-blur hover:bg-transparent hover:text-inherit"
  asChild
>
  <Link to="/community">
    Join Community
  </Link>
</Button>

          </div>
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

export default Home;