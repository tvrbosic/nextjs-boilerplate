// COMPONENTS
import Spinner from '@/components/spinner/spinner';

export default function Loading() {
  return (
    <div className="bg-secondary/70 flex h-screen items-center justify-center">
      <Spinner size="lg" variant="light" />
    </div>
  );
}
