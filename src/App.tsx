import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Footer from "./components/ui/Footer";
import { cn } from "@/lib/utils";
import { PageTransition } from "./components/PageTransition";
import { CartProvider } from '@/contexts/CartContext';

// Lazy load page components
const Index = lazy(() => import("./pages/Index"));
const Discover = lazy(() => import("./pages/Discover"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/404"));
const Galleries = lazy(() => import("./pages/Galleries"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./components/shop/ProductDetail"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const CartPage = lazy(() => import("./pages/CartPage"));

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
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<Index />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/galleries" element={<Galleries />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/shop/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </PageTransition>
          </AnimatePresence>
        </Suspense>
      </main>
      {!isDiscoverPage && <Footer />}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <CartProvider>
      <AppContent />
    </CartProvider>
  </BrowserRouter>
);

export default App;
