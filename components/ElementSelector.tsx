import React from 'react';
import { StoryElementCategory } from '../types';

interface ElementSelectorProps {
  category: StoryElementCategory;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

const CATEGORY_LABELS = {
  [StoryElementCategory.HERO]: '🦸 Quem é o herói da sua história?',
  [StoryElementCategory.PLACE]: '🏰 Onde acontece a aventura?',
  [StoryElementCategory.ADVENTURE]: '⚔️ Qual é a missão do herói?',
  [StoryElementCategory.OUTCOME]: '✨ Como termina a história?'
};

const CATEGORY_COLORS = {
  [StoryElementCategory.HERO]: 'from-red-400 to-pink-500',
  [StoryElementCategory.PLACE]: 'from-green-400 to-blue-500',
  [StoryElementCategory.ADVENTURE]: 'from-purple-400 to-indigo-500',
  [StoryElementCategory.OUTCOME]: 'from-yellow-400 to-orange-500'
};

const ElementSelector: React.FC<ElementSelectorProps> = ({ 
  category, 
  options, 
  selectedValue, 
  onSelect 
}) => {
  return (
    <div className="space-y-4">
      <h3 className={`text-xl font-bold bg-gradient-to-r ${CATEGORY_COLORS[category]} bg-clip-text text-transparent`}>
        {CATEGORY_LABELS[category]}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onSelect(option)}
            className={`p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
              selectedValue === option
                ? `bg-gradient-to-r ${CATEGORY_COLORS[category]} text-white shadow-lg scale-105`
                : 'bg-white/60 hover:bg-white/80 text-gray-700 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="font-medium">{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ElementSelector;