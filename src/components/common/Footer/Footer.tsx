export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 py-3">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          © {currentYear}{' '}
          <a
            href="https://github.com/ling5821"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            ling5821
          </a>
          {' | '}
          <a
            href="https://github.com/ling5821/pick-bot-name"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Bot Name Generator
          </a>
          {' | MIT License'}
        </p>
      </div>
    </footer>
  );
}
