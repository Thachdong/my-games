import { TToast, useToast } from 'game_caro_package/context-api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const ToastCard: React.FC<TToast> = ({ id, message, type }) => {
  const [progress, setProgress] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { closeToast, timeout } = useToast();
  const duration = timeout || 5000;

  const toastTypeClass = useMemo(() => {
    return {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      error: 'bg-red-100 text-red-800',
      warning: 'bg-yellow-100 text-yellow-800',
    }[type || 'info'];
  }, [type]);

  const progressBarClass = useMemo(() => {
    return {
      info: 'bg-blue-400',
      success: 'bg-green-400',
      error: 'bg-red-400',
      warning: 'bg-yellow-400',
    }[type || 'info'];
  }, [type]);

  const handleClose = useCallback(() => {
    closeToast(id);
  }, [id, closeToast]);

  useEffect(() => {
    const start = Date.now();
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      const percent = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(percent);
      if (percent === 0) {
        closeToast(id);
      }
    }, 50);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [id, closeToast, duration]);

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast(id);
    }, duration);
    return () => clearTimeout(timer);
  }, [id, closeToast, duration]);

  return (
    <div className={`relative p-4 rounded-lg shadow-lg ${toastTypeClass}`}>
      <div className="flex items-center justify-between relative">
        <span>{message}</span>
        <button
          onClick={handleClose}
          className="absolute -right-2 -top-5 ml-4 text-2xl text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
      <div className="absolute bottom-0 left-2 right-2 h-1 bg-gray-200 rounded overflow-hidden">
        <div
          className={`${progressBarClass} h-full transition-all duration-100`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};
