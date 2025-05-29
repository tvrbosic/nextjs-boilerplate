// LIBRARY
import { createContext, useState, useCallback, use } from 'react';

// TYPES
import type { IGlobalLoaderProviderProps, IGlobalLoaderContextType } from '@/context/global-loader/types';

// COMPONENTS
import OverlaySpinnerLoader from '@/components/loaders/overlay-loader-spinner';

const GlobalLoaderContext = createContext<IGlobalLoaderContextType | undefined>(undefined);

export function GlobalLoaderProvider({ children }: IGlobalLoaderProviderProps) {
  const [count, setCount] = useState(0);

  const startLoader = useCallback(() => setCount((prev) => prev + 1), []);
  const stopLoader = useCallback(() => setCount((prev) => Math.max(prev - 1, 0)), []);

  return (
    <GlobalLoaderContext.Provider value={{ isLoading: count > 0, startLoader, stopLoader }}>
      {children}
      {count > 0 && <OverlaySpinnerLoader />}
    </GlobalLoaderContext.Provider>
  );
}

export const useGlobalLoaderContext = () => {
  const context = use(GlobalLoaderContext);

  if (!context) {
    throw new Error('useGlobalLoaderContext must be used within GlobalLoaderProvider');
  }

  return context;
};
