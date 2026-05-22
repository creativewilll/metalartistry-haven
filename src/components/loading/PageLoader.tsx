import { useEffect, useLayoutEffect, useState, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ForgeLoader } from './ForgeLoader';
import { DiscoverLoader } from './DiscoverLoader';
import { SteelLoader } from './SteelLoader';
import { usePageLoader } from './PageLoaderContext';

// Determine loader type based on route
function getLoaderType(pathname: string): 'forge' | 'discover' | 'steel' | 'none' {
  if (pathname === '/') {
    return 'forge';
  }
  if (pathname === '/discover' || pathname.startsWith('/discover/')) {
    return 'discover';
  }
  if (pathname.startsWith('/journal/')) {
    return 'none';
  }
  // Contact pages: no heavy loader, just rely on the AnimatedRoute fade (0.3s)
  if (pathname === '/contact' || pathname === '/contact-form') {
    return 'none';
  }
  return 'steel';
}

// Get page name for steel loader
function getPageName(pathname: string): string {
  const path = pathname.split('/')[1];
  if (!path) return 'Home';
  return path.charAt(0).toUpperCase() + path.slice(1);
}

// Discover routes (gallery wall + slug-based detail view) share a single
// surface — navigating between them should NOT retrigger the intro loader.
function isDiscoverRoute(pathname: string): boolean {
  return pathname === '/discover' || pathname.startsWith('/discover/');
}

export function PageLoader() {
  const location = useLocation();
  const { isLoading, stopLoading, startLoading } = usePageLoader();

  const [displayLoader, setDisplayLoader] = useState(true);
  const [currentLoaderType, setCurrentLoaderType] = useState<'forge' | 'discover' | 'steel' | 'none'>(() => getLoaderType(location.pathname));
  const [pageName, setPageName] = useState('Loading');
  const [imageProgress, setImageProgress] = useState(0);
  // Unique key to force re-mount loaders on every route change
  const [loaderKey, setLoaderKey] = useState(0);
  // Track the previous pathname so we can suppress the loader when navigating
  // within the same surface (e.g. /discover ⇄ /discover/:slug detail view).
  const prevPathnameRef = useRef<string | null>(null);

  // Track route changes and update loader type.
  // useLayoutEffect runs synchronously BEFORE the browser paints, so the loader
  // is mounted and visible on the very first frame of the new route — preventing
  // the brief flash of underlying page content during navigation.
  useLayoutEffect(() => {
    const type = getLoaderType(location.pathname);
    const name = getPageName(location.pathname);
    const prevPath = prevPathnameRef.current;
    prevPathnameRef.current = location.pathname;

    setCurrentLoaderType(type);
    setPageName(name);

    // Suppress the discover intro when moving between /discover and
    // /discover/:slug — same surface, opening/closing the detail modal
    // shouldn't replay the intro animation.
    if (
      type === 'discover' &&
      prevPath !== null &&
      isDiscoverRoute(prevPath)
    ) {
      setDisplayLoader(false);
      return;
    }

    if (type === 'none') {
      setDisplayLoader(false);
      return;
    }

    setDisplayLoader(true);
    setLoaderKey(prev => prev + 1);

    if (type === 'steel') {
      startLoading(type);
      setImageProgress(0);
    }
  }, [location.pathname, startLoading]);

  // Steel loader: simulate progress so the legacy SteelLoader has something to drive its bar.
  // Forge and Discover loaders are now fully self-contained on their own timelines.
  useEffect(() => {
    if (!isLoading || currentLoaderType !== 'steel') return;

    const interval = setInterval(() => {
      setImageProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => stopLoading(), 200);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isLoading, currentLoaderType, stopLoading]);

  const handleComplete = useCallback(() => {
    setDisplayLoader(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {displayLoader && (
        <>
          {currentLoaderType === 'forge' && (
            <ForgeLoader
              key={loaderKey}
              onComplete={handleComplete}
            />
          )}
          {currentLoaderType === 'discover' && (
            <DiscoverLoader
              key={loaderKey}
              onComplete={handleComplete}
            />
          )}
          {currentLoaderType === 'steel' && (
            <SteelLoader
              key={loaderKey}
              isLoading={isLoading}
              onComplete={handleComplete}
              pageName={pageName}
            />
          )}
        </>
      )}
    </AnimatePresence>
  );
}
