import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Users, Globe, Archive, Camera, Calendar, MapPin, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const missionPoints = [
  {
    icon: Archive,
    title: "Digital Preservation",
    description: "Safeguarding ancient manuscripts, murals, and artifacts through high-resolution digitization."
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Making Sikkim's spiritual heritage accessible to researchers, pilgrims, and curious minds worldwide."
  },
  {
    icon: Users,
    title: "Community Engagement",
    description: "Collaborating with local monks, historians, and communities to share authentic stories."
  },
  {
    icon: Heart,
    title: "Cultural Respect",
    description: "Honoring the sacred nature of these spaces while promoting understanding and appreciation."
  }
];

const impactStats = [
  { label: "Monasteries Documented", value: "28" },
  { label: "Artifacts Digitized", value: "1,247" },
  { label: "Virtual Tours Created", value: "15" },
  { label: "Community Contributors", value: "150+" },
  { label: "Countries Reached", value: "45" },
  { label: "Educational Partnerships", value: "12" }
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-himalayan">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-secondary text-secondary-foreground">
              About Monastery360
            </Badge>
            <h1 className="text-5xl font-bold monastery-heading mb-6">
              <span className="text-gradient-gold">Preserving Sacred Heritage</span>
              <br />
              <span className="text-3xl font-medium text-foreground">for Future Generations</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Monastery360 is a pioneering digital heritage platform dedicated to documenting, 
              preserving, and sharing the spiritual treasures of Sikkim's ancient monasteries 
              through innovative technology and respectful collaboration.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold monastery-heading mb-4">
              Our <span className="text-gradient-gold">Mission</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We bridge the ancient and modern worlds by creating immersive digital experiences 
              that honor tradition while embracing technology for cultural preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missionPoints.map((point, index) => {
              const Icon = point.icon;
              return (
                <Card key={index} className="monastery-border hover:monastery-glow transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-monastery flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">{point.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold monastery-heading mb-4">
              Our <span className="text-gradient-gold">Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Since our inception, we've achieved remarkable milestones in digital heritage preservation 
              and global cultural outreach.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold monastery-heading text-gradient-gold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sikkim's Monasteries Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold monastery-heading mb-6">
                Sikkim's Spiritual Legacy
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Nestled in the Eastern Himalayas, Sikkim is home to some of the world's most 
                sacred Buddhist monasteries. These architectural marvels house centuries of 
                wisdom, art, and spiritual practice.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong>Strategic Location:</strong> At the crossroads of Tibet, Nepal, and Bhutan
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong>Rich Traditions:</strong> Nyingma, Kagyu, and Sakya Buddhist schools
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <strong>Ancient History:</strong> Some monasteries date back to the 17th century
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-gradient-monastery hover:opacity-90"
                asChild
              >
                <Link to="/monasteries">
                  Explore All Monasteries
                </Link>
              </Button>
            </div>

            <div className="space-y-6">
              <Card className="monastery-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Camera className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-semibold">Virtual Reality Tours</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Experience 360° immersive tours of monastery interiors, prayer halls, 
                    and sacred spaces with detailed narration and historical context.
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Archive className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-semibold">Digital Archives</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Access high-resolution scans of ancient manuscripts, thangka paintings, 
                    and rare documents preserved for academic research and cultural study.
                  </p>
                </CardContent>
              </Card>

              <Card className="monastery-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="h-8 w-8 text-primary" />
                    <h3 className="text-xl font-semibold">Community Stories</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Listen to oral histories from resident monks, local historians, 
                    and community elders sharing personal connections to these sacred spaces.
                  </p>
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
            Join Our Mission
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Help us preserve and share Sikkim's spiritual heritage. Whether you're a researcher, 
            educator, or simply curious about Buddhist culture, there's a place for you in our community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 h-auto"
              asChild
            >
              <Link to="/community">
                Join Our Community
              </Link>
            </Button>
             <Button 
              size="lg" 
              variant="secondary" 
              className="text-lg px-8 py-6 h-auto"
              asChild
            >
              <Link to="/support">
                Get Support
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

export default About;