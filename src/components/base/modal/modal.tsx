'use client';

import { PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from '@untitledui/icons';

type ModalProps = PropsWithChildren<{
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}>;

export function Modal({ open, onClose, title, footer, size = 'md', className, children }: ModalProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      document.addEventListener('keydown', onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [open, onClose]);

  if (!open) return null;

  const maxWidth = size === 'sm' ? 'max-w-md' : size === 'lg' ? 'max-w-4xl' : 'max-w-2xl';

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          className={`w-full ${maxWidth} bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 ${className || ''}`}
        >
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200 dark:border-gray-800">
            <div className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </div>
            <button
              aria-label="Close"
              onClick={onClose}
              className="inline-flex items-center justify-center w-8 h-8 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 sm:p-5">
            {children}
          </div>
          {footer && (
            <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-800">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
