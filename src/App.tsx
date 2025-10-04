import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Monasteries from "./pages/Monasteries";
import MonasteryDetail from "./pages/MonasteryDetail";
import Tours from "./pages/Tours";
import TourDetail from "./pages/TourDetail";
import Archives from "./pages/Archives";
import Calendar from "./pages/Calendar";
import Itinerary from "./pages/Itinerary";
import Community from "./pages/Community";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/monasteries" element={<Monasteries />} />
          <Route path="/monastery/:id" element={<MonasteryDetail />} />
          {/* Additional routes for future pages */}
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<TourDetail />} />
          <Route path="/archives" element={<Archives />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/itinerary" element={<Itinerary />} />
          <Route path="/community" element={<Community />} />
          <Route path="/support" element={<Support />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
