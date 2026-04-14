import './App.css';
import '@/core/i18n/i18n';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeToggle, LanguageToggle, Header, Footer } from '@/components/common';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { BotGenerator } from '@/components/Generator';
import { preloadAnimeAvatars } from '@/core/avatar';

function AppContent() {
  // 预加载anime头像
  useEffect(() => {
    preloadAnimeAvatars(5).catch(err => {
      console.warn('Failed to preload anime avatars:', err);
    });
  }, []);

  return (
    <div className="app relative min-h-screen pb-16 overflow-x-hidden max-w-full">
      {/* 右上角按钮组 - 语言、主题切换和GitHub */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
        <Header />
      </div>

      {/* 路由内容 */}
      <Routes>
        <Route path="/" element={<BotGenerator />} />
      </Routes>

      {/* 版权信息 */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router basename="/pick-bot-name">
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
