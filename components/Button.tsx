import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  disabled = false, 
  className = '', 
  children 
}) => {
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-opacity-50';
  const hoverClasses = disabled 
    ? 'cursor-not-allowed opacity-50' 
    : 'hover:scale-105 hover:shadow-lg active:scale-95';
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;