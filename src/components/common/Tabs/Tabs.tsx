/**
 * 标签页组件
 */

import React, { useState } from 'react';

export interface Tab {
  id: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  className = '',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');

  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (tabId: string, disabled?: boolean) => {
    if (disabled) return;

    if (controlledActiveTab === undefined) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  return (
    <div className={`flex gap-1 md:gap-2 border-b border-gray-200 dark:border-gray-700 ${className}`}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        const baseClasses = 'px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-all duration-200 relative whitespace-nowrap';
        const activeClasses = isActive
          ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
          : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-300';
        const disabledClasses = tab.disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer';

        return (
          <button
            key={tab.id}
            className={`${baseClasses} ${activeClasses} ${disabledClasses}`}
            onClick={() => handleTabClick(tab.id, tab.disabled)}
            disabled={tab.disabled}
          >
            <span className="flex items-center gap-1 md:gap-2">
              {tab.icon && <span className="text-sm md:text-base">{tab.icon}</span>}
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
};
