import React from 'react';

interface FallbackErrorProps {
  error?: Error;
  resetError?: () => void;
}

const FallbackError: React.FC<FallbackErrorProps> = ({ error, resetError }) => {
  return (
    <div className="min-h-[200px] flex items-center justify-center flex-col gap-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/10">
      <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">
        Something went wrong
      </h2>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">
          {error.message}
        </p>
      )}
      {resetError ? (
        <button
          onClick={resetError}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Try Again
        </button>
      ) : (
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Refresh Page
        </button>
      )}
    </div>
  );
};

export default FallbackError;