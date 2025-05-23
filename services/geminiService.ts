import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratedStory } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY || '');

export async function generateStoryAndImagePrompts(
  hero: string,
  place: string,
  adventure: string,
  outcome: string,
  model: string
): Promise<GeneratedStory> {
  try {
    const model_instance = genAI.getGenerativeModel({ model });
    
    const prompt = `
Crie uma história infantil mágica e envolvente para uma criança chamada Theo. A história deve ter exatamente 4 páginas.

Elementos da história:
- Herói: ${hero}
- Local: ${place}
- Aventura: ${adventure}
- Final: ${outcome}

Por favor, retorne APENAS um objeto JSON válido com a seguinte estrutura:
{
  "title": "título criativo da história",
  "pages": [
    {
      "text": "texto da página 1 (2-3 frases, linguagem infantil, mencionando Theo)",
      "imagePrompt": "prompt detalhado para gerar uma ilustração desta página em inglês, estilo infantil, colorido"
    },
    {
      "text": "texto da página 2",
      "imagePrompt": "prompt para ilustração da página 2"
    },
    {
      "text": "texto da página 3", 
      "imagePrompt": "prompt para ilustração da página 3"
    },
    {
      "text": "texto da página 4",
      "imagePrompt": "prompt para ilustração da página 4"
    }
  ]
}

IMPORTANTE: 
- Use linguagem simples e adequada para crianças
- Mencione o nome "Theo" na história
- Os imagePrompts devem ser em inglês e detalhados
- Retorne APENAS o JSON, sem texto adicional
`;

    const result = await model_instance.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Resposta bruta do Gemini:', text);
    
    // Limpar a resposta para extrair apenas o JSON
    const cleanedText = text.trim().replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
    try {
      const storyData = JSON.parse(cleanedText);
      
      // Validar a estrutura da resposta
      if (!storyData.title || !storyData.pages || !Array.isArray(storyData.pages)) {
        throw new Error('Estrutura de resposta inválida do Gemini');
      }
      
      if (storyData.pages.length !== 4) {
        throw new Error('A história deve ter exatamente 4 páginas');
      }
      
      // Validar cada página
      for (let i = 0; i < storyData.pages.length; i++) {
        const page = storyData.pages[i];
        if (!page.text || !page.imagePrompt) {
          throw new Error(`Página ${i + 1} está incompleta`);
        }
      }
      
      return storyData;
      
    } catch (parseError) {
      console.error('Erro ao fazer parse da resposta:', parseError);
      console.error('Texto que causou erro:', cleanedText);
      throw new Error('Falha ao processar a resposta da IA. Formato JSON inválido.');
    }
    
  } catch (error) {
    console.error('Erro na geração da história:', error);
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        throw new Error('Chave de API inválida ou não configurada');
      }
      throw error;
    }
    throw new Error('Erro desconhecido na geração da história');
  }
}