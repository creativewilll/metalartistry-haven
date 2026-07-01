import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter, Route, Routes, Navigate, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { FEATURES } from './config/features';
import { SiteLayout } from './components/layout/SiteLayout';
import { PageLoaderProvider, PageLoader } from './components/loading';
import { CategoryDetail } from './pages/CategoryDetail';
import { Contact } from './pages/Contact';
import { Discover } from './pages/Discover';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Process } from './pages/Process';
import { Services } from './pages/Services';
import { Glossary } from './pages/Glossary';

// Flag-gated surfaces. Declared as lazy() so their chunks are only fetched
// when the feature flag renders them — disabled, they never load for visitors.
const ComingSoonGate = lazy(() =>
  import('./components/ComingSoonGate').then((m) => ({ default: m.ComingSoonGate }))
);
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Journal = lazy(() => import('./pages/Journal').then((m) => ({ default: m.Journal })));
const JournalPost = lazy(() => import('./pages/JournalPost').then((m) => ({ default: m.JournalPost })));

function RedirectCategorySlug() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/services/${slug}`} replace />;
}

// Animated route wrapper for page transitions
function AnimatedRoute({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Collapse routes that share a single page surface to one transition key,
// so navigating *within* that surface (e.g. opening/closing the discover
// detail modal at /discover/:slug) doesn't trigger a full page fade.
function getTransitionKey(pathname: string): string {
  if (pathname === '/discover' || pathname.startsWith('/discover/')) {
    return '/discover';
  }
  if (pathname === '/services' || pathname.startsWith('/services/')) {
    return '/services';
  }
  return pathname;
}

// Routes component with AnimatePresence for transitions
function AnimatedRoutes() {
  const location = useLocation();
  const transitionKey = getTransitionKey(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={transitionKey}>
        <Route path="/" element={<AnimatedRoute><Home /></AnimatedRoute>} />
        <Route path="/services" element={<AnimatedRoute><Services /></AnimatedRoute>} />
        <Route path="/services/:slug" element={<AnimatedRoute><CategoryDetail /></AnimatedRoute>} />
        <Route path="/process" element={<AnimatedRoute><Process /></AnimatedRoute>} />
        <Route path="/categories" element={<Navigate to="/services" replace />} />
        <Route path="/categories/:slug" element={<RedirectCategorySlug />} />
        <Route path="/discover" element={<AnimatedRoute><Discover /></AnimatedRoute>} />
        <Route path="/discover/:slug" element={<AnimatedRoute><Discover /></AnimatedRoute>} />
        {FEATURES.journal ? (
          <>
            <Route
              path="/journal"
              element={
                <AnimatedRoute>
                  <Suspense fallback={null}>
                    <Journal />
                  </Suspense>
                </AnimatedRoute>
              }
            />
            <Route
              path="/journal/:slug"
              element={
                <AnimatedRoute>
                  <Suspense fallback={null}>
                    <JournalPost />
                  </Suspense>
                </AnimatedRoute>
              }
            />
          </>
        ) : (
          <>
            <Route path="/journal" element={<Navigate to="/" replace />} />
            <Route path="/journal/:slug" element={<Navigate to="/" replace />} />
          </>
        )}
        {FEATURES.aboutPage && (
          <Route
            path="/about"
            element={
              <AnimatedRoute>
                <Suspense fallback={null}>
                  <About />
                </Suspense>
              </AnimatedRoute>
            }
          />
        )}
        <Route path="/glossary" element={<AnimatedRoute><Glossary /></AnimatedRoute>} />
        <Route path="/contact" element={<AnimatedRoute><Contact /></AnimatedRoute>} />
        {/* Intake form removed — dead lead pipeline. Old links redirect to /contact. */}
        <Route path="/contact-form" element={<Navigate to="/contact" replace />} />
        <Route path="*" element={<AnimatedRoute><NotFound /></AnimatedRoute>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const app = (
    <BrowserRouter>
      <PageLoaderProvider>
        <PageLoader />
        <SiteLayout>
          <AnimatedRoutes />
        </SiteLayout>
      </PageLoaderProvider>
    </BrowserRouter>
  );

  return (
    <HelmetProvider>
      {FEATURES.comingSoonGate ? (
        <Suspense fallback={null}>
          <ComingSoonGate>{app}</ComingSoonGate>
        </Suspense>
      ) : (
        app
      )}
    </HelmetProvider>
  );
}
