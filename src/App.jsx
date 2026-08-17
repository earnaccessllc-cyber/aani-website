import { Suspense, lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';

const Home = lazy(() => import('./pages/Home'));
const Collection = lazy(() => import('./pages/Collection.jsx'));
const Craft = lazy(() => import('./pages/Craft'));
const Vision = lazy(() => import('./pages/Vision'));
const Atelier = lazy(() => import('./pages/Atelier'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
// Add page imports here

const RouteFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
  </div>
);

function App() {

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/craft" element={<Craft />} />
              <Route path="/vision" element={<Vision />} />
              <Route path="/atelier" element={<Atelier />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </Router>
        <Toaster />
      </QueryClientProvider>
    </HelmetProvider>
  )
}

export default App