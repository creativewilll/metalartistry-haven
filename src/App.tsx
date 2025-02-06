import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/ui/Footer";
import { cn } from "@/lib/utils";
import { PageTransition } from "./components/PageTransition";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const Discover = lazy(() => import("./pages/Discover"));
const Contact = lazy(() => import("./pages/Contact"));

const queryClient = new QueryClient();

/**
 * App Component
 * 
 * Main application component that handles routing and layout.
 * Conditionally renders navigation and footer based on the current route.
 */
const AppContent = () => {
  const location = useLocation();
  const isDiscoverPage = location.pathname === '/discover';

  return (
    <div className={cn("min-h-screen flex flex-col", {
      "bg-zinc-950": isDiscoverPage
    })}>
      {!isDiscoverPage && <Navigation />}
      <main className={cn("flex-grow", {
        "h-screen": isDiscoverPage
      })}>
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
          <PageTransition>
            <Routes location={location}>
              <Route path="/" element={<Index />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </main>
      {!isDiscoverPage && <Footer />}
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
