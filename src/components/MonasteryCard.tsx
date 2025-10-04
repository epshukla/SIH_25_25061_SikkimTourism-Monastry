import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Users, Camera, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface MonasteryCardProps {
  id: string;
  name: string;
  location: string;
  founded: string;
  tradition: string;
  image: string;
  description: string;
  hasVirtualTour?: boolean;
  upcomingEvents?: number;
  artifacts?: number;
}

export const MonasteryCard = ({
  id,
  name,
  location,
  founded,
  tradition,
  image,
  description,
  hasVirtualTour = false,
  upcomingEvents = 0,
  artifacts = 0,
}: MonasteryCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-lg hover:monastery-glow monastery-border">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={`${name} monastery`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Status badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-secondary/90 backdrop-blur">
            {tradition}
          </Badge>
          {hasVirtualTour && (
            <Badge className="bg-primary/90 backdrop-blur">
              <Camera className="h-3 w-3 mr-1" />
              360° Tour
            </Badge>
          )}
        </div>

        {/* Quick stats */}
        <div className="absolute bottom-4 left-4 flex items-center gap-4 text-white text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{founded}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-semibold monastery-heading mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          {upcomingEvents > 0 && (
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{upcomingEvents} upcoming events</span>
            </div>
          )}
          {artifacts > 0 && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{artifacts} artifacts</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button 
            asChild 
            className="flex-1 bg-gradient-monastery hover:opacity-90 transition-opacity"
          >
            <Link to={`/monastery/${id}`}>
              Explore
            </Link>
          </Button>
          {hasVirtualTour && (
            <Button variant="outline" size="icon" asChild>
              <Link to={`/tours/${id}`}>
                <Camera className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};