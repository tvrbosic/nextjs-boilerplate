export interface IGlobalLoaderContextType {
  startLoader: () => void;
  stopLoader: () => void;
  isLoading: boolean;
}

export interface IGlobalLoaderProviderProps {
  children: React.ReactNode;
}
