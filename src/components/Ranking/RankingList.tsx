/**
 * 排行榜组件
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useStatsStore } from '@/store';
import { Card } from '@/components/common';

export const RankingList: React.FC = () => {
  const { t } = useTranslation();
  const { getTopNames } = useStatsStore();

  const topNames = getTopNames(10);

  return (
    <Card>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t('ranking.title')}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {t('ranking.description')}
        </p>

        {topNames.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="text-6xl">📊</div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t('ranking.empty')}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {t('ranking.emptyHint')}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('ranking.rank')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('ranking.name')}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('ranking.style')}
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('ranking.copyCount')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {topNames.map((stat, index) => (
                  <tr
                    key={`${stat.style}:${stat.name}`}
                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' :
                        index === 2 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' :
                        'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {index + 1}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {stat.name}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {t(`style.${stat.style}`)}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        {stat.count}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
};
