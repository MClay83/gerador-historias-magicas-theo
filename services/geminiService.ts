import { GoogleGenerativeAI } from '@google/generative-ai';
import { GeneratedStory, StoryPage } from '../types';

// Configuração da API do Google Gemini
const apiKey = import.meta.env.VITE_API_KEY;
if (!apiKey) {
  console.warn('⚠️ VITE_API_KEY não configurada. Configure no arquivo .env para usar geração de histórias.');
}

// Initialize GoogleGenerativeAI client
let ai: GoogleGenerativeAI | null = null;
const getAIClient = (): GoogleGenerativeAI => {
    if (!ai) {
        ai = new GoogleGenerativeAI(apiKey || '');
    }
    return ai;
}

export const generateStoryAndImagePrompts = async (
  hero: string,
  place: string,
  adventure: string,
  outcome: string,
  modelName: string
): Promise<GeneratedStory> => {
  const client = getAIClient();
  const model = client.getGenerativeModel({ model: modelName });
  
  const prompt = `
    Você é um contador de histórias amigável e criativo para um menino de 6 anos chamado Theo. Crie uma história especialmente para ele.
    Suas histórias são sempre positivas, imaginativas, apropriadas para a idade e fáceis de entender.
    Os personagens devem permanecer consistentes.
    O herói da história pode ser o próprio Theo, ou um personagem que Theo gostaria de acompanhar em uma aventura.
    Crie uma história de 6 a 7 páginas usando os seguintes elementos:
    - Herói: ${hero}
    - Lugar: ${place}
    - Aventura: ${adventure}
    - Desfecho: ${outcome}

    Para cada página da história, forneça:
    1. O texto da história para aquela página.
    2. Um prompt curto e descritivo (máximo 15 palavras) para uma ilustração colorida em estilo cartoon infantil.

    IMPORTANTE: Responda APENAS com JSON válido. NÃO adicione texto extra, comentários, linhas "Lookup:", "regex:", ou qualquer outra informação fora do JSON.

    Use EXATAMENTE este formato JSON (sem adições):
    {
      "title": "Título da História",
      "pages": [
        {
          "pageNumber": 1,
          "text": "Texto da primeira página da história.",
          "imagePrompt": "Descrição curta para ilustração cartoon infantil"
        },
        {
          "pageNumber": 2,
          "text": "Texto da segunda página da história.",
          "imagePrompt": "Descrição curta para ilustração cartoon infantil"
        }
      ]
    }

    Certifique-se de que:
    - O JSON seja válido (sem vírgulas extras, sem campos adicionais, sem comentários)
    - Cada imagePrompt termine sempre com ". cartoon infantil, colorido, lúdico, para crianças de 6 anos, sem realismo."
    - A história seja adequada para uma criança de 6 anos
    - Os personagens sejam consistentes ao longo da história
    - O texto seja envolvente e fácil de entender
    - NÃO adicione nenhuma linha extra, comentário ou informação fora do JSON especificado
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let jsonStr = response.text().trim();
    
    console.log("📝 Resposta bruta do Gemini:", jsonStr);
    
    // Remove caracteres problemáticos que podem causar erro de parsing
    jsonStr = jsonStr
      .replace(/[\u0000-\u001f]+/g, '') // Remove caracteres de controle
      .replace(/\s*Lookup:.*$/gm, '') // Remove linhas "Lookup:" que o Gemini adiciona incorretamente
      .replace(/\s*regex":\s*"[^"]*"\s*$/gm, '') // Remove linhas "regex:" problemáticas
      .replace(/^\s*regex":\s*"[^"]*"\s*$/gm, '') // Remove linhas "regex:" no início
      .replace(/regex":\s*"[^"]*"\s*/g, '') // Remove qualquer padrão regex": "..." onde quer que esteja
      .replace(/,(\s*[}\]])/g, '$1') // Remove vírgulas antes de } ou ]
      .replace(/([}\]])(\s*)([{\[])/g, '$1,$2$3') // Adiciona vírgulas entre objetos/arrays se necessário
      .replace(/}\s*{/g, '},{') // Adiciona vírgulas entre objetos adjacentes
      .replace(/]\s*\[/g, '],[') // Adiciona vírgulas entre arrays adjacentes
      .replace(/```json\n?/g, '') // Remove marcadores de código
      .replace(/```\n?/g, ''); // Remove marcadores de código
    
    console.log("🧹 JSON limpo:", jsonStr);
    
    let parsedData: GeneratedStory;
    try {
      parsedData = JSON.parse(jsonStr) as GeneratedStory;
    } catch (parseError) {
      console.error("❌ Erro ao fazer parse do JSON:", parseError);
      console.log("🔍 JSON problemático:", jsonStr);
      
      // Tentativa de correção mais agressiva
      try {
        console.log("🔧 Tentando correção JSON...");
        // Tenta corrigir removendo linhas completamente malformadas
        let correctedJson = jsonStr;
        
        // Remove qualquer linha que tenha regex": sozinha
        correctedJson = correctedJson.replace(/^[\s*regex":[^,}]*$/gm, '');
        correctedJson = correctedJson.replace(/regex":[^,}]*/g, '');
        
        // Remove linhas órfãs e malformadas mais agressivamente
        correctedJson = correctedJson.replace(/[^"{}\[\],:]+regex"[^,}]*/g, '');
        correctedJson = correctedJson.replace(/\s*regex":\s*"[^"]*"[^,}]*/g, '');
        
        // Limpa espaços extras e quebras de linha problemáticas
        correctedJson = correctedJson.replace(/\s+/g, ' ');
        correctedJson = correctedJson.replace(/,\s*,/g, ',');
        correctedJson = correctedJson.replace(/,\s*}/g, '}');
        correctedJson = correctedJson.replace(/,\s*]/g, ']');
        
        console.log("🔧 JSON totalmente corrigido:", correctedJson);
        parsedData = JSON.parse(correctedJson) as GeneratedStory;
        console.log("✅ Parse bem-sucedido após correção agressiva!");
        
      } catch (secondError) {
        console.error("❌ Falha na correção automática do JSON:", secondError);
        
        // Último recurso: reconstrução manual do JSON
        console.log("🚨 Tentando reconstrução manual do JSON...");
        try {
          // Extrai o título
          const titleMatch = jsonStr.match(/"title":\s*"([^"]+)"/);
          const title = titleMatch ? titleMatch[1] : "História do Theo";
          
          // Extrai cada página individualmente
          const pages = [];
          const pageRegex = /{\s*"pageNumber":\s*(\d+),\s*"text":\s*"([^"]+)",\s*"imagePrompt":\s*"([^"]+)"\s*[^}]*}/g;
          let pageMatch;
          
          while ((pageMatch = pageRegex.exec(jsonStr)) !== null) {
            pages.push({
              pageNumber: parseInt(pageMatch[1]),
              text: pageMatch[2],
              imagePrompt: pageMatch[3]
            });
          }
          
          // Se não conseguiu extrair páginas, cria uma estrutura mínima
          if (pages.length === 0) {
            console.log("⚠️ Não foi possível extrair páginas, criando história de emergência...");
            pages.push({
              pageNumber: 1,
              text: "Era uma vez o Theo, que adorava aventuras incríveis! Hoje ele descobriu algo mágico que mudou tudo...",
              imagePrompt: "Criança feliz descobrindo algo mágico, cartoon infantil colorido"
            });
          }
          
          const reconstructedData = { title, pages };
          console.log("🔨 JSON reconstruído:", JSON.stringify(reconstructedData));
          parsedData = reconstructedData as GeneratedStory;
          
        } catch (thirdError) {
          console.error("❌ Falha na reconstrução manual do JSON:", thirdError);
          throw new Error(`JSON inválido retornado pelo Gemini. Erro: ${parseError.message}`);
        }
      }
    }

    if (!parsedData.title || !parsedData.pages || !Array.isArray(parsedData.pages) || parsedData.pages.length === 0) {
      throw new Error("Resposta da API em formato JSON inesperado ou incompleto.");
    }
    
    // Ensure page numbers are sequential and correct
    parsedData.pages.forEach((page, index) => {
      page.pageNumber = index + 1;
    });

    console.log("✅ História gerada com sucesso:", parsedData.title);
    return parsedData;

  } catch (error) {
    console.error("❌ Erro ao gerar história com Gemini:", error);
    if (error instanceof Error && error.message.includes("API key not valid")) {
        throw new Error("Chave de API inválida. Por favor, verifique sua configuração.");
    }
    throw new Error(`Falha ao gerar texto da história para Theo: ${error instanceof Error ? error.message : String(error)}`);
  }
};

export const generateImageForPrompt = async (
  prompt: string,
  modelName: string
): Promise<string> => {
  const client = getAIClient();
  const model = client.getGenerativeModel({ model: modelName });
  
  // Prompt mais específico e detalhado para garantir estilo cartoon infantil
  const enhancedPrompt = `${prompt}. Estilo cartoon infantil, colorido, lúdico, para crianças de 6 anos, sem realismo, arte digital vibrante.`;
  
  try {
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;

    // Assumindo que a resposta contém uma URL ou dados da imagem
    const imageData = response.text().trim();
    
    if (!imageData) {
      throw new Error("Resposta vazia da API de geração de imagem");
    }
    
    console.log("✅ Imagem gerada com sucesso via Gemini");
    return imageData;

  } catch (error) {
    console.error("❌ Erro ao gerar imagem com Gemini:", error);
    throw new Error(`Falha ao gerar imagem para Theo: ${error instanceof Error ? error.message : String(error)}`);
  }
};