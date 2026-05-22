import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type LoaderType = 'forge' | 'discover' | 'steel' | 'none';

interface PageLoaderContextType {
  isLoading: boolean;
  loaderType: LoaderType;
  progress: number;
  startLoading: (type: LoaderType) => void;
  stopLoading: () => void;
  setProgress: (progress: number) => void;
}

const PageLoaderContext = createContext<PageLoaderContextType | undefined>(undefined);

export function PageLoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [loaderType, setLoaderType] = useState<LoaderType>('forge');
  const [progress, setProgressState] = useState(0);

  const startLoading = useCallback((type: LoaderType) => {
    setLoaderType(type);
    setIsLoading(true);
    setProgressState(0);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
    setProgressState(100);
  }, []);

  const setProgress = useCallback((value: number) => {
    setProgressState(Math.min(100, Math.max(0, value)));
  }, []);

  return (
    <PageLoaderContext.Provider
      value={{
        isLoading,
        loaderType,
        progress,
        startLoading,
        stopLoading,
        setProgress,
      }}
    >
      {children}
    </PageLoaderContext.Provider>
  );
}

export function usePageLoader() {
  const context = useContext(PageLoaderContext);
  if (context === undefined) {
    throw new Error('usePageLoader must be used within a PageLoaderProvider');
  }
  return context;
}
