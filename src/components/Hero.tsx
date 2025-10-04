import { Button } from "@/components/ui/button";
import { MapPin, Camera, Archive, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-monastery.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Sikkim Monastery Heritage"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Prayer flags decoration */}
      <div className="absolute top-0 left-0 w-full h-32 z-10">
        <div className="prayer-flag-animation">
          <div className="h-1 bg-gradient-to-r from-transparent via-secondary via-primary via-accent via-secondary to-transparent opacity-60" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold monastery-heading mb-6 leading-tight">
            <span className="text-gradient-gold block mb-2">Monastery360</span>
            <span className="text-3xl md:text-4xl font-medium opacity-90">
              Digital Heritage Platform
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Explore Sikkim's Sacred Heritage — Anywhere, Anytime
          </p>

          <p className="text-lg mb-12 opacity-80 max-w-3xl mx-auto">
            Immerse yourself in the spiritual beauty of Sikkim's ancient monasteries through 
            360° virtual tours, digital archives, and interactive cultural experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-monastery hover:opacity-90 text-lg px-8 py-6 h-auto"
              asChild
            >
              <Link to="/tours" className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Start Virtual Tour
              </Link>
            </Button>

            <Button 
  size="lg" 
  variant="outline" 
  className="border-primary-foreground/30 text-primary-foreground bg-white/10 text-lg px-8 py-6 h-auto backdrop-blur hover:bg-transparent hover:text-inherit"
  asChild
>
  <Link to="/monasteries">
    Explore Monasteries
  </Link>
</Button>

          </div>

          {/* Feature Icons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <Link to="/tours" className="group flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                <Camera className="h-8 w-8" />
              </div>
              <span className="text-sm opacity-80 group-hover:opacity-100">Virtual Tours</span>
            </Link>

            <Link to="/monasteries" className="group flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                <MapPin className="h-8 w-8" />
              </div>
              <span className="text-sm opacity-80 group-hover:opacity-100">Interactive Map</span>
            </Link>

            <Link to="/archives" className="group flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                <Archive className="h-8 w-8" />
              </div>
              <span className="text-sm opacity-80 group-hover:opacity-100">Digital Archives</span>
            </Link>

            <Link to="/calendar" className="group flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center mb-3 group-hover:bg-white/20 transition-colors">
                <Calendar className="h-8 w-8" />
              </div>
              <span className="text-sm opacity-80 group-hover:opacity-100">Cultural Calendar</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="h-6 w-4 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-1 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};