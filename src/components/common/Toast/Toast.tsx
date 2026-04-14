/**
 * Toast 通知组件
 */

import React, { useEffect } from 'react';

export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeStyles = {
    success: 'bg-green-500 dark:bg-green-600',
    error: 'bg-red-500 dark:bg-red-600',
    info: 'bg-blue-500 dark:bg-blue-600',
  };

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
  };

  return (
    <div className="fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 z-[9999] animate-slide-in">
      <div
        className={`${typeStyles[type]} text-white px-4 md:px-6 py-3 md:py-4 rounded-lg shadow-2xl flex items-center gap-2 md:gap-3 max-w-full md:min-w-[320px] md:max-w-lg`}
      >
        <span className="text-xl md:text-2xl font-bold">{icons[type]}</span>
        <span className="flex-1 font-medium text-sm md:text-base break-words">{message}</span>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-xl md:text-2xl leading-none ml-1 md:ml-2 flex-shrink-0"
        >
          ×
        </button>
      </div>
    </div>
  );
};
