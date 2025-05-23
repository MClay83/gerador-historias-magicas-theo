import React, { useState, useCallback, useEffect } from 'react';
import { StoryElementCategory, SelectedElements, GeneratedStory, StoryPage } from './types';
import { STORY_ELEMENT_OPTIONS, GEMINI_TEXT_MODEL } from './constants';
import ElementSelector from './components/ElementSelector';
import StoryViewer from './components/StoryViewer';
import LoadingSpinner from './components/LoadingSpinner';
import Button from './components/Button';
import { generateStoryAndImagePrompts } from './services/geminiService';
import { generateImageWithHuggingFace } from './services/huggingfaceService';
import { downloadStoryAsPDF } from './services/pdfService';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'selection' | 'generating_story' | 'generating_images' | 'viewing_story'>('selection');
  const [selectedElements, setSelectedElements] = useState<SelectedElements>({
    [StoryElementCategory.HERO]: null,
    [StoryElementCategory.PLACE]: null,
    [StoryElementCategory.ADVENTURE]: null,
    [StoryElementCategory.OUTCOME]: null,
  });
  const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progressMessage, setProgressMessage] = useState<string>('');

  const handleElementSelect = useCallback((category: StoryElementCategory, value: string) => {
    setSelectedElements(prev => ({ ...prev, [category]: value }));
    setError(null); // Clear previous errors on new selection
  }, []);

  const areAllElementsSelected = (): boolean => {
    return Object.values(selectedElements).every(value => value !== null);
  };

  const resetStory = () => {
    setCurrentStep('selection');
    setGeneratedStory(null);
    setSelectedElements({
      [StoryElementCategory.HERO]: null,
      [StoryElementCategory.PLACE]: null,
      [StoryElementCategory.ADVENTURE]: null,
      [StoryElementCategory.OUTCOME]: null,
    });
    setError(null);
    setProgressMessage('');
  };
  
  const handleGenerateStory = async () => {
    if (!areAllElementsSelected()) {
      setError("Por favor, Theo, selecione todos os elementos da história.");
      return;
    }
    setError(null);
    setCurrentStep('generating_story');
    setProgressMessage("Criando uma história mágica para Theo... ✨");

    try {
      const storyData = await generateStoryAndImagePrompts(
        selectedElements[StoryElementCategory.HERO]!,
        selectedElements[StoryElementCategory.PLACE]!,
        selectedElements[StoryElementCategory.ADVENTURE]!,
        selectedElements[StoryElementCategory.OUTCOME]!,
        GEMINI_TEXT_MODEL
      );
      
      console.log("✅ História gerada, iniciando geração de ilustrações...");
      setGeneratedStory(storyData);
      setCurrentStep('generating_images');
      setProgressMessage("Criando lindas ilustrações temáticas para a aventura do Theo... 🎨");

      const pagesWithImages: StoryPage[] = [];
      
      for (let i = 0; i < storyData.pages.length; i++) {
        const page = storyData.pages[i];
        setProgressMessage(`Desenhando ilustração para a página ${i + 1} de ${storyData.pages.length} da história do Theo... 🎨`);
        try {
          console.log(`🎨 Iniciando geração de ilustração para página ${i + 1}:`, page.imagePrompt);
          const imageUrl = await generateImageWithHuggingFace(page.imagePrompt, i);
          pagesWithImages.push({ ...page, imageUrl });
          console.log(`✅ Ilustração criada com sucesso para página ${i + 1}`);
        } catch (imgErr) {
          console.error(`❌ Falha ao gerar ilustração para página ${i + 1}:`, imgErr);
          
          // Fallback de emergência caso o SVG também falhe (muito improvável)
          const emergencyFallback = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
            <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
              <rect width="512" height="512" fill="#E6F3FF"/>
              <circle cx="256" cy="200" r="60" fill="#4A90E2" opacity="0.7"/>
              <text x="256" y="300" font-family="Arial, sans-serif" font-size="20" font-weight="bold" text-anchor="middle" fill="#2C3E50">
                História do Theo
              </text>
              <text x="256" y="330" font-family="Arial, sans-serif" font-size="16" text-anchor="middle" fill="#34495E">
                Página ${i + 1}
              </text>
              <text x="256" y="360" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#7F8C8D">
                Algo deu errado, mas sua história continua!
              </text>
            </svg>
          `)}`;
          
          pagesWithImages.push({ ...page, imageUrl: emergencyFallback });
        }
        // Update story progressively with images
        setGeneratedStory(prev => prev ? ({ ...prev, pages: [...pagesWithImages, ...storyData.pages.slice(i + 1)] }) : null);
      }
      
      console.log(`📊 Resultado: ${storyData.pages.length} ilustrações temáticas criadas para o Theo!`);
      
      setGeneratedStory(prev => prev ? ({ ...prev, pages: pagesWithImages }) : null);
      setCurrentStep('viewing_story');
      
      setProgressMessage(`🎉 História completa! ${storyData.pages.length} páginas com lindas ilustrações temáticas especiais para o Theo! ✨`);
      setTimeout(() => setProgressMessage(''), 6000);

    } catch (err) {
      console.error("❌ Falha na geração da história:", err);
      let errorMessage = "Ocorreu um erro desconhecido ao gerar a história para o Theo. Tente novamente.";
      
      if (err instanceof Error) {
        if (err.message.includes("JSON inválido")) {
          errorMessage = "Erro na formatação da resposta da IA. Tente novamente com elementos diferentes.";
        } else if (err.message.includes("API key")) {
          errorMessage = "Problema com a chave da API. Verifique a configuração.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      setCurrentStep('selection');
      setProgressMessage('');
    }
  };

  const handleDownloadPdf = async () => {
    if (!generatedStory || !generatedStory.pages.every(p => p.imageUrl)) {
      setError("A história do Theo ou as imagens ainda não estão prontas para download.");
      return;
    }
    setProgressMessage("Preparando o PDF da história do Theo... 📜");
    try {
      await downloadStoryAsPDF(generatedStory);
      setProgressMessage("PDF da história do Theo baixado com sucesso!");
      setTimeout(() => setProgressMessage(''), 3000);
    } catch (err) {
      console.error("Failed to download PDF:", err);
      setError("Falha ao baixar o PDF da história do Theo. Tente novamente.");
      setProgressMessage('');
    }
  };

  useEffect(() => {
    if (!import.meta.env.VITE_API_KEY) {
      setError("Chave de API não configurada. Verifique as variáveis de ambiente. A geração de histórias para o Theo não funcionará sem ela.");
      setCurrentStep('selection'); 
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-sky-300 text-gray-800 flex flex-col items-center p-4 selection:bg-indigo-500 selection:text-white">
      <header className="w-full max-w-4xl text-center my-8">
        <h1 className="text-5xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Gerador de Histórias Mágicas para Theo 🌟
        </h1>
        <p className="text-lg text-indigo-700 mt-2">Theo, crie suas aventuras incríveis aqui!</p>
      </header>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4 w-full max-w-2xl rounded shadow-md" role="alert">
          <p className="font-bold">Ops, Theo! Algo deu errado:</p>
          <p>{error}</p>
        </div>
      )}

      {currentStep === 'selection' && (
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-2xl space-y-6">
          {Object.values(StoryElementCategory).map(category => (
            <ElementSelector
              key={category}
              category={category}
              options={STORY_ELEMENT_OPTIONS[category]}
              selectedValue={selectedElements[category]}
              onSelect={(value) => handleElementSelect(category, value)}
            />
          ))}
          <Button
            onClick={handleGenerateStory}
            disabled={!areAllElementsSelected() || !import.meta.env.VITE_API_KEY}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-xl py-4"
          >
            Criar Minha História, Theo! ✨
          </Button>
           {!import.meta.env.VITE_API_KEY && <p className="text-sm text-red-600 text-center mt-2">A geração de histórias está desabilitada devido à falta da chave de API.</p>}
        </div>
      )}

      {(currentStep === 'generating_story' || currentStep === 'generating_images') && (
        <div className="text-center p-8 bg-white/80 backdrop-blur-md rounded-xl shadow-2xl">
          <LoadingSpinner />
          <p className="text-2xl font-semibold text-indigo-700 mt-6">{progressMessage}</p>
          <p className="text-md text-gray-600 mt-2">Por favor, aguarde um momento, Theo...</p>
        </div>
      )}

      {currentStep === 'viewing_story' && generatedStory && (
        <div className="w-full max-w-4xl">
          <StoryViewer story={generatedStory} />
          <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button onClick={handleDownloadPdf} className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 text-lg">
              Baixar PDF da História do Theo 💾
            </Button>
            <Button onClick={resetStory} className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 text-lg">
              Criar Nova História para Theo 🔄
            </Button>
          </div>
          {progressMessage && <p className="text-center text-green-700 mt-4">{progressMessage}</p>}
        </div>
      )}
      
      <footer className="mt-12 text-center text-sm text-indigo-800/80">
        <p>&copy; {new Date().getFullYear()} Gerador de Histórias Mágicas para Theo. Feito com ❤️ para pequenos sonhadores como você!</p>
      </footer>
    </div>
  );
};

export default App;