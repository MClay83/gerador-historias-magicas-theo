import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        {/* Spinner principal */}
        <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-500"></div>
        
        {/* Efeito de pulsação */}
        <div className="absolute inset-0 w-16 h-16 border-4 border-purple-200 rounded-full animate-ping opacity-20"></div>
        
        {/* Estrela central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-indigo-500 text-2xl animate-pulse">✨</div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;