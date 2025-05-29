import Spinner from '../spinner/spinner';

export default function OverlaySpinnerLoader() {
  return (
    <div className="bg-primary/70 bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <Spinner size="lg" variant="light" />
    </div>
  );
}
