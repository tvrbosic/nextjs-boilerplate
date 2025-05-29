// COMPONENTS
import OverlayLoaderSpinner from '@/components/loaders/overlay-loader-spinner';

export default function Loading() {
  return (
    <div className="bg-secondary/70 flex h-screen items-center justify-center">
      <OverlayLoaderSpinner />
    </div>
  );
}
