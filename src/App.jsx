import { Suspense, lazy, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { CartProvider } from '@/lib/cart';
import CartDrawer from '@/components/cart/CartDrawer';

const Home = lazy(() => import('./pages/Home'));
const Collection = lazy(() => import('./pages/Collection.jsx'));
const Craft = lazy(() => import('./pages/Craft'));
const Atelier = lazy(() => import('./pages/Atelier'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Stockists = lazy(() => import('./pages/Stockists'));
const Product = lazy(() => import('./pages/Product'));
// Add page imports here

const RouteFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

// Every page change starts at the top (the browser's own restore jumped around
// while the page was still laying out). Switching colors stays on one product
// page, so it doesn't scroll.
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

function ScrollToTop() {
  const { pathname } = useLocation();
  const key = pathname.startsWith('/collection/') ? '/collection/product' : pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [key]);
  return null;
}

function App() {

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/collection/:lineId/:colorwayId" element={<Product />} />
              <Route path="/metier" element={<Craft />} />
              <Route path="/craft" element={<Craft />} />
              <Route path="/vision" element={<Craft />} />
              <Route path="/atelier" element={<Atelier />} />
              <Route path="/stockists" element={<Stockists />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
          <CartDrawer />
        </Router>
        </CartProvider>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App
