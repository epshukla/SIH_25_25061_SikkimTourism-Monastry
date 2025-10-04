import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Search, Filter, Download, Eye, 
  Archive, BookOpen, Palette, FileText,
  Calendar, MapPin, Maximize
} from "lucide-react";

interface ArchiveItem {
  id: string;
  title: string;
  image_url: string;
  description: string;
  date: string;
  century: string;
  monastery: string;
  category: string;
  language: string;
  pdf_url?: string;
}

const Archives = () => {
  const [archives, setArchives] = useState<ArchiveItem[]>([]);
  const [filteredArchives, setFilteredArchives] = useState<ArchiveItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMonastery, setSelectedMonastery] = useState("all");
  const [selectedCentury, setSelectedCentury] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  const categoryIcons = {
    Manuscript: BookOpen,
    Mural: Palette,
    Thangka: Palette,
    Artifact: Archive,
    Documentation: FileText,
  };

  useEffect(() => {
    const loadArchives = async () => {
      try {
        const response = await fetch('/data/archives.json');
        const data = await response.json();
        setArchives(data);
        setFilteredArchives(data);
        setLoading(false);
      } catch (error) {
        console.error('Error loading archives:', error);
        setLoading(false);
      }
    };

    loadArchives();
  }, []);

  useEffect(() => {
    let filtered = archives.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.monastery.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMonastery = selectedMonastery === "all" || item.monastery === selectedMonastery;
      const matchesCentury = selectedCentury === "all" || item.century === selectedCentury;
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;

      return matchesSearch && matchesMonastery && matchesCentury && matchesCategory;
    });

    setFilteredArchives(filtered);
  }, [searchTerm, selectedMonastery, selectedCentury, selectedCategory, archives]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedMonastery("all");
    setSelectedCentury("all");
    setSelectedCategory("all");
  };

  const getUniqueCenturies = () => {
    const centuries = [...new Set(archives.map(item => item.century))];
    return centuries.sort();
  };

  const getUniqueMonasteries = () => {
    const monasteries = [...new Set(archives.map(item => item.monastery))];
    return monasteries.sort();
  };

  const getUniqueCategories = () => {
    const categories = [...new Set(archives.map(item => item.category))];
    return categories.sort();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="animate-pulse text-2xl monastery-heading">Loading Digital Archives...</div>
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
              Digital Archives
            </h1>
            <p className="text-xl opacity-90 mb-8 leading-relaxed">
              Explore our comprehensive collection of digitized manuscripts, murals, artifacts, 
              and historical documents from Sikkim's monasteries.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Archive className="h-4 w-4" />
                <span>{archives.length} Items</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span>Searchable</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>High Resolution</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search archives by title, description, or monastery..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-lg monastery-border"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              
              <Select value={selectedMonastery} onValueChange={setSelectedMonastery}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Monasteries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Monasteries</SelectItem>
                  {getUniqueMonasteries().map(monastery => (
                    <SelectItem key={monastery} value={monastery}>
                      {monastery}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCentury} onValueChange={setSelectedCentury}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Centuries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Centuries</SelectItem>
                  {getUniqueCenturies().map(century => (
                    <SelectItem key={century} value={century}>
                      {century}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {getUniqueCategories().map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">
              Showing {filteredArchives.length} of {archives.length} archive items
            </p>
          </div>
        </div>
      </section>

      {/* Archives Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredArchives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArchives.map((item) => {
                const CategoryIcon = categoryIcons[item.category as keyof typeof categoryIcons] || Archive;
                
                return (
                  <Dialog key={item.id}>
                    <DialogTrigger asChild>
                      <Card className="monastery-border overflow-hidden group cursor-pointer hover:monastery-glow transition-all duration-300">
                        <div className="aspect-[3/4] relative overflow-hidden">
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-primary/90 backdrop-blur">
                              <CategoryIcon className="h-3 w-3 mr-1" />
                              {item.category}
                            </Badge>
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-black/50 backdrop-blur rounded-full p-3">
                              <Eye className="h-6 w-6 text-white" />
                            </div>
                          </div>
                        </div>
                        
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <h3 className="font-semibold line-clamp-2 text-sm">
                              {item.title}
                            </h3>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <MapPin className="h-3 w-3" />
                              <span>{item.monastery}</span>
                            </div>
                            
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{item.date}</span>
                            </div>
                            
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {item.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    
                    <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
  <DialogHeader>
    <DialogTitle className="text-2xl monastery-heading">
      {item.title}
    </DialogTitle>
  </DialogHeader>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Left side: image or PDF */}
    <div className="space-y-4">
      {item.pdf_url ? (
        <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-50">
          {/* PDF Viewer */}
          <iframe
            src={item.pdf_url}
            title={item.title}
            className="w-full h-[500px] rounded-lg"
          />
        </div>
      ) : (
        <div className="aspect-[3/4] overflow-hidden rounded-lg">
          <img
            src={item.image_url}
            alt={item.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="flex gap-2">
        {item.pdf_url ? (
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => window.open(item.pdf_url, "_blank")}
          >
            <Maximize className="h-4 w-4 mr-2" />
            Open PDF
          </Button>
        ) : (
          <Button size="sm" className="flex-1">
            <Maximize className="h-4 w-4 mr-2" />
            Full Screen
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => {
            const link = document.createElement("a");
            link.href = item.pdf_url || item.image_url;
            link.download = `${item.title}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
          }}
        >
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>

    {/* Right side: metadata */}
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Description</h3>
        <p className="text-muted-foreground leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-1">Monastery</h4>
          <p className="text-sm text-muted-foreground">{item.monastery}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Date</h4>
          <p className="text-sm text-muted-foreground">{item.date}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Period</h4>
          <p className="text-sm text-muted-foreground">{item.century}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Category</h4>
          <p className="text-sm text-muted-foreground">{item.category}</p>
        </div>
        <div>
          <h4 className="font-medium mb-1">Language</h4>
          <p className="text-sm text-muted-foreground">{item.language}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline">{item.category}</Badge>
        <Badge variant="secondary">{item.century}</Badge>
        <Badge className="bg-primary/10 text-primary">{item.monastery}</Badge>
      </div>
    </div>
  </div>
</DialogContent>

                  </Dialog>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground mb-4">
                <Archive className="h-16 w-16 mx-auto mb-4 opacity-50" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No archives found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to find relevant items.
              </p>
              <Button onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Archives;