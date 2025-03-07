// LIB
import { ErrorBoundary } from 'react-error-boundary';

// COMPONENTS
import GlobalErrorFallback from '@/components/global-error-boundary/global-error-fallback';

export default function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary fallback={<GlobalErrorFallback />}>{children}</ErrorBoundary>
  );
}
