import { createContext, useCallback, useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer } from 'game_caro_package/components/molecules';

export type TToastType = 'info' | 'success' | 'error' | 'warning';

export type TToast = {
  id: string;
  message: string;
  type?: TToastType;
};

export type TToastContext = {
  toasts: TToast[];
  timeout?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  toast: (message: string, type?: TToastType) => void;
  closeToast: (id: string) => void;
};

type TToastProviderProps = {
  children: React.ReactNode;
  timeout?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const ToastContext = createContext<TToastContext | undefined>(undefined);

export const ToastProvider: React.FC<TToastProviderProps> = ({
  children,
  timeout = 50000,
  position = 'bottom-left',
}) => {
  const [toasts, setToasts] = useState<TToast[]>([]);

  const toast = useCallback((message: string, type: TToastType = 'info') => {
    const id = nanoid();

    const newToast: TToast = { id, message, type };

    setToasts((prevToasts) => [ newToast, ...prevToasts]);
  }, []);

  const closeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, closeToast, toasts, timeout, position }}>
      {children}

      <ToastContainer toasts={toasts} position={position} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  return context;
};
