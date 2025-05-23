import React, { useState } from 'react';
import { GeneratedStory } from '../types';
import Button from './Button';

interface StoryViewerProps {
  story: GeneratedStory;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ story }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const nextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, story.pages.length - 1));
  };

  const prevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
  };

  const currentStoryPage = story.pages[currentPage];

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
      {/* Header com título */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 text-center">
        <h2 className="text-3xl font-bold">{story.title}</h2>
        <p className="text-indigo-100 mt-2">
          Página {currentPage + 1} de {story.pages.length}
        </p>
      </div>

      {/* Conteúdo da página */}
      <div className="p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Imagem */}
          <div className="order-1 lg:order-1">
            {currentStoryPage.imageUrl ? (
              <div className="relative">
                <img
                  src={currentStoryPage.imageUrl}
                  alt={`Ilustração da página ${currentPage + 1}`}
                  className="w-full h-auto rounded-lg shadow-lg max-h-96 object-cover"
                  onError={(e) => {
                    console.error('Erro ao carregar imagem:', e);
                  }}
                />
                <div className="absolute inset-0 rounded-lg ring-2 ring-indigo-200"></div>
              </div>
            ) : (
              <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🎨</div>
                  <p>Carregando ilustração...</p>
                </div>
              </div>
            )}
          </div>

          {/* Texto */}
          <div className="order-2 lg:order-2">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg border-l-4 border-indigo-400">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                {currentStoryPage.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Botões de navegação */}
          <div className="flex space-x-3">
            <Button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Anterior
            </Button>
            <Button
              onClick={nextPage}
              disabled={currentPage === story.pages.length - 1}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Próxima →
            </Button>
          </div>

          {/* Indicadores de página */}
          <div className="flex space-x-2">
            {story.pages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentPage
                    ? 'bg-indigo-500'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;