import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MapPin, Archive, Calendar, Users, Search, HeartHandshake, Route } from "lucide-react";

const navigationItems = [
  { name: "Home", href: "/", icon: null },
  { name: "Monasteries", href: "/monasteries", icon: MapPin },
  { name: "Virtual Tours", href: "/tours", icon: Search },
  { name: "Archives", href: "/archives", icon: Archive },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Itinerary", href: "/itinerary", icon: Route },
  { name: "Community", href: "/community", icon: Users },
  { name: "About", href: "/about", icon: null },
  { name: "Support", href: "/support", icon: HeartHandshake },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-monastery flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">M</span>
          </div>
          <span className="text-xl font-bold monastery-heading text-gradient-gold">
            Monastery360
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className="flex items-center space-x-2 transition-all duration-300 hover:bg-secondary/20"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80">
            <div className="flex flex-col space-y-4 mt-8">
              <div className="text-lg font-semibold monastery-heading text-gradient-gold mb-4">
                Monastery360
              </div>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button
                      variant={isActive(item.href) ? "secondary" : "ghost"}
                      className="w-full justify-start flex items-center space-x-3 h-12"
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                      <span className="text-base">{item.name}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};