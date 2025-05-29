// LIBRARY
import { createContext, useCallback, useState } from 'react';

// TYPES
import { IToastMessageContext, TToastVariant, IToastMessageProps } from '@/context/toast-message/types';

const VARIANT_CLASSES: Record<TToastVariant, string> = {
  success: 'bg-emerald-400 text-white',
  error: 'bg-red-400 text-white',
  info: 'bg-blue-400 text-white',
  warning: 'bg-orange-300 text-black',
};

const ToastMessageContext = createContext<IToastMessageContext>({} as IToastMessageContext);

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<IToastMessageProps[]>([]);

  const showToast = useCallback((message: string, variant: TToastVariant = 'success', duration: number = 3000) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [
      ...prev,
      {
        id,
        message,
        variant,
        duration,
      },
    ]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration || 3000);
  }, []);

  return (
    <ToastMessageContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed right-5 bottom-5 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg p-4 shadow-md transition-opacity ${VARIANT_CLASSES[toast.variant]} `}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastMessageContext.Provider>
  );
};

export { ToastMessageContext, ToastProvider };
