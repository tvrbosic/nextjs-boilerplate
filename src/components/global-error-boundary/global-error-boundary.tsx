import { ErrorBoundary } from 'react-error-boundary';

export default function GlobalErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary fallback={<p>⚠️Something went wrong</p>}>
      {children}
    </ErrorBoundary>
  );
}
