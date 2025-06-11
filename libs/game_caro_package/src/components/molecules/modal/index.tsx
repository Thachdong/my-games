'use client';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TransitionAnimate } from '../transition-animate';
import "./modal.scss";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRoot =
    typeof window !== 'undefined'
      ? document.getElementById('modal-root')
      : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen || !modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 8,
          minWidth: 300,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <TransitionAnimate
          transitionProps={{
            mode: 'out-in',
          }}
          cssTransitionProps={{
            classNames: 'fade',
            key: `modal-${isOpen}`
          }}
        >
          <>{children}</>
        </TransitionAnimate>
      </div>
    </div>,
    modalRoot
  );
};
