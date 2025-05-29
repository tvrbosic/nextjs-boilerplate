import Spinner from '@/components/spinner/spinner';

export default function OverlayLoaderSpinner() {
  return (
    <div className="bg-primary/70 bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <Spinner size="xl" variant="dark" />
    </div>
  );
}
