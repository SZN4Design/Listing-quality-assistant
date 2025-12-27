import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ListingProvider } from "@/contexts/ListingContext";
import ListingEditor from "./pages/ListingEditor";
import FixPhotos from "./pages/FixPhotos";
import FixTitle from "./pages/FixTitle";
import FixDescription from "./pages/FixDescription";
import FixPrice from "./pages/FixPrice";
import PostPublishDashboard from "./pages/PostPublishDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ListingProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/listing-editor" replace />} />
            <Route path="/listing-editor" element={<ListingEditor />} />
            <Route path="/fix-photos" element={<FixPhotos />} />
            <Route path="/fix-title" element={<FixTitle />} />
            <Route path="/fix-description" element={<FixDescription />} />
            <Route path="/fix-price" element={<FixPrice />} />
            <Route path="/post-publish-dashboard" element={<PostPublishDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ListingProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
