import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar as CalendarIcon,
  MapPin,
  Clock,
  Star,
  Search,
  Filter,
  ExternalLink,
} from "lucide-react";

interface Event {
  id: string;
  name: string;
  description: string;
  month: string;
  season: string;
  type: string;
  location: string;
  monasteries: string[];
  duration: string;
  significance: string;
}

interface Monastery {
  id: string;
  name: string;
  location: string;
}

const Calendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [monasteries, setMonasteries] = useState<Monastery[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsResponse, monasteriesResponse] = await Promise.all([
          fetch("/data/events.json"),
          fetch("/data/monasteries.json"),
        ]);
        const eventsData = await eventsResponse.json();
        const monasteriesData = await monasteriesResponse.json();
        setEvents(eventsData);
        setMonasteries(monasteriesData);
        setFilteredEvents(eventsData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Filter events
  useEffect(() => {
    let filtered = events;

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSeason !== "all") {
      filtered = filtered.filter((event) => event.season === selectedSeason);
    }

    if (selectedMonth !== "all") {
      filtered = filtered.filter((event) => event.month === selectedMonth);
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((event) => event.type === selectedType);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, selectedSeason, selectedMonth, selectedType]);

  const getMonasteryName = (monasteryId: string) => {
    const monastery = monasteries.find((m) => m.id === monasteryId);
    return monastery ? monastery.name : monasteryId;
  };

  const getSeasonColor = (season: string) => {
    switch (season.toLowerCase()) {
      case "spring": return "bg-green-100 text-green-800";
      case "summer": return "bg-yellow-100 text-yellow-800";
      case "autumn": return "bg-orange-100 text-orange-800";
      case "winter": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "religious festival": return "bg-purple-100 text-purple-800";
      case "ritual festival": return "bg-indigo-100 text-indigo-800";
      case "cultural festival": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-pulse text-2xl monastery-heading">
              Loading Festivals & Events...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-monastery text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <CalendarIcon className="h-16 w-16 mx-auto mb-6 text-gold" />
          <h1 className="text-5xl font-bold monastery-heading mb-6 text-primary-foreground">
            Festivals & Events of Sikkim
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90 text-primary-foreground">
            Discover the rich cultural tapestry of Sikkim through its sacred festivals 
            and monastery celebrations. Experience the spiritual heritage that has 
            flourished in the Himalayas for centuries.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search festivals, monasteries, or events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
            </div>
            
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={selectedSeason} onValueChange={setSelectedSeason}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Seasons</SelectItem>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Summer">Summer</SelectItem>
                  <SelectItem value="Autumn">Autumn</SelectItem>
                  <SelectItem value="Winter">Winter</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  <SelectItem value="February">February</SelectItem>
                  <SelectItem value="March">March</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="October">October</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Religious Festival">Religious Festival</SelectItem>
                  <SelectItem value="Ritual Festival">Ritual Festival</SelectItem>
                  <SelectItem value="Cultural Festival">Cultural Festival</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-bold monastery-heading mb-2">
              {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
            </h2>
            <p className="text-muted-foreground">
              Explore the sacred celebrations and cultural traditions of Sikkim's monasteries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <Dialog key={event.id}>
                <DialogTrigger asChild>
                  <Card className="monastery-border hover:monastery-glow transition-all duration-300 cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={getSeasonColor(event.season)}>
                          {event.season}
                        </Badge>
                        <Badge variant="outline">{event.month}</Badge>
                      </div>
                      <CardTitle className="monastery-heading text-xl group-hover:text-monastery-gold transition-colors">
                        {event.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>Duration: {event.duration}</span>
                        </div>
                        <Badge className={getTypeColor(event.type)} variant="outline">
                          {event.type}
                        </Badge>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {event.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>

                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getSeasonColor(event.season)}>
                        {event.season}
                      </Badge>
                      <Badge className={getTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <DialogTitle className="monastery-heading text-2xl">
                      {event.name}
                    </DialogTitle>
                    <DialogDescription className="text-base leading-relaxed">
                      {event.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          Event Details
                        </h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div>Month: {event.month}</div>
                          <div>Duration: {event.duration}</div>
                          <div>Location: {event.location}</div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Star className="h-4 w-4" />
                          Significance
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {event.significance}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Associated Monasteries
                      </h4>
                      <div className="space-y-2">
                        {event.monasteries.map((monasteryId) => (
                          <Button
                            key={monasteryId}
                            variant="outline"
                            className="w-full justify-between"
                            asChild
                          >
                            <Link to={`/tours/${monasteryId}`}>
                              <span>{getMonasteryName(monasteryId)}</span>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <Button className="w-full" size="lg">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No events found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSeason("all");
                  setSelectedMonth("all");
                  setSelectedType("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Calendar;