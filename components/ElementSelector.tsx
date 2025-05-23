import React from 'react';
import { StoryElementCategory, StoryElementOption } from '../types';

interface ElementSelectorProps {
  category: StoryElementCategory;
  options: StoryElementOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

const ElementSelector: React.FC<ElementSelectorProps> = ({ category, options, selectedValue, onSelect }) => {
  return (
    <div className="mb-6 p-6 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4 text-center">{category}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map(option => (
          <button
            key={option.id}
            onClick={() => onSelect(option.name)} // Use name for prompt, id for internal key if needed
            className={`p-4 rounded-md text-left transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-sky-400
              ${selectedValue === option.name 
                ? 'bg-indigo-500 text-white shadow-md ring-2 ring-indigo-600' 
                : 'bg-sky-100 hover:bg-sky-200 text-indigo-800 shadow-sm'
              }`}
          >
            <span className="text-2xl mr-2">{option.emoji}</span>
            <span className="font-medium">{option.name}</span>
          </button>
        ))}
      </div>
      {selectedValue && (
        <p className="mt-3 text-sm text-center text-indigo-600 font-medium">Selecionado para Theo: {selectedValue}</p>
      )}
    </div>
  );
};

export default ElementSelector;