// LIB
import React, { useState, useEffect, ComponentType } from 'react';

// TYPES
import { IWithErrorBoundaryTriggerProps } from '@/hoc/types';

export function withErrorBoundaryTrigger<
  T extends IWithErrorBoundaryTriggerProps,
>(WrappedComponent: ComponentType<T>) {
  return (props: Omit<T, keyof IWithErrorBoundaryTriggerProps>) => {
    const [errorTriggerCount, setErrorTriggerCount] = useState(0);

    // Effect to trigger error boundary when state changes
    useEffect(() => {
      if (errorTriggerCount > 0) {
        throw new Error('500'); // Trigger error boundary
      }
    }, [errorTriggerCount]);

    // Function to trigger the error
    const triggerError = () => {
      setErrorTriggerCount((prev) => prev + 1);
    };

    return (
      <WrappedComponent {...(props as T)} triggerGlobalError={triggerError} />
    );
  };
}
