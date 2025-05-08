import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/ui/Footer";
import { cn } from "@/lib/utils";
import { PageTransition } from "./components/PageTransition";

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const Discover = lazy(() => import("./pages/Discover"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/404"));
const Galleries = lazy(() => import("./pages/Galleries"));
const TypeForm = lazy(() => import("./components/contact/TypeForm"));

const AppContent = () => {
  const location = useLocation();
  const isDiscoverPage = location.pathname === '/discover';
  const isTypeFormPage = location.pathname === '/contact-form';

  return (
    <div className={cn("min-h-screen flex flex-col", {
      "bg-zinc-950": isDiscoverPage
    })}>
      {!isDiscoverPage && !isTypeFormPage && <Navigation />}
      <main className={cn("flex-grow", {
        "h-screen": isDiscoverPage
      })}>
        <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Index />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/contact-form" element={<TypeForm />} />
                <Route path="/galleries" element={<Galleries />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </Suspense>
      </main>
      {!isDiscoverPage && !isTypeFormPage && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
