/**
 * 加载旋转器组件
 */

import React from 'react';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message,
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div
        className={`${sizeClasses[size]} border-4 border-cyber-cyan/30 border-t-cyber-cyan rounded-full animate-spin`}
      />
      {message && (
        <p className="text-gray-400 animate-pulse">{message}</p>
      )}
    </div>
  );
};
