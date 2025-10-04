import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-himalayan flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl monastery-heading text-gradient-gold mb-6">
          404
        </div>
        <h1 className="text-3xl font-bold monastery-heading mb-4">
          Sacred Path Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          The monastery path you're seeking has been lost in the Himalayan mists. 
          Let us guide you back to the spiritual journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg"
            className="bg-gradient-monastery hover:opacity-90"
          >
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Return Home
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>
        
        <div className="mt-12 text-sm text-muted-foreground">
          "Not all who wander are lost, but this page certainly is."
        </div>
      </div>
    </div>
  );
};

export default NotFound;
