import { HfInference } from '@huggingface/inference';

// Token personalizado do usuário (necessário ser "Write")
const getHfToken = (): string => {
  return import.meta.env.VITE_HUGGINGFACE_TOKEN || '';
};

// Poucos modelos que ainda funcionam na API gratuita (maio 2025)
// Infelizmente a maioria parou de funcionar, mas vamos tentar os principais
const WORKING_MODELS = [
  'stabilityai/stable-diffusion-xl-base-1.0', // Este ainda funciona às vezes
  'runwayml/stable-diffusion-v1-5',           // Backup clássico
  'prompthero/openjourney-v4',                // Para estilo cartoon
];

// Sistema inteligente de SVG que interpreta o contexto da história
const generateContextAwareSVG = (prompt: string, pageNumber: number): string => {
  console.log(`🎨 Criando ilustração SVG inteligente para: "${prompt}"`);
  
  // Analisa o contexto do prompt para escolher elementos visuais apropriados
  const lowerPrompt = prompt.toLowerCase();
  
  // Detecta elementos da história para criar SVGs temáticos
  const isForest = lowerPrompt.includes('floresta') || lowerPrompt.includes('árvore') || lowerPrompt.includes('bosque');
  const isCastle = lowerPrompt.includes('castelo') || lowerPrompt.includes('palácio') || lowerPrompt.includes('torre');
  const isMagic = lowerPrompt.includes('mágico') || lowerPrompt.includes('varinha') || lowerPrompt.includes('feitiço');
  const isOcean = lowerPrompt.includes('mar') || lowerPrompt.includes('oceano') || lowerPrompt.includes('praia');
  const isDragon = lowerPrompt.includes('dragão') || lowerPrompt.includes('dragao');
  const isNight = lowerPrompt.includes('noite') || lowerPrompt.includes('escuro') || lowerPrompt.includes('lua');
  const isSun = lowerPrompt.includes('sol') || lowerPrompt.includes('dia') || lowerPrompt.includes('brilhante');
  
  // Cores baseadas no contexto
  let primaryColor = '#4A90E2';
  let secondaryColor = '#98FB98';
  let bgGradient = ['#E3F2FD', '#FFFFFF'];
  
  if (isForest) {
    primaryColor = '#228B22';
    secondaryColor = '#90EE90';
    bgGradient = ['#98FB98', '#F0FFF0'];
  } else if (isCastle) {
    primaryColor = '#8B4513';
    secondaryColor = '#D2B48C';
    bgGradient = ['#F5F5DC', '#FFFACD'];
  } else if (isMagic) {
    primaryColor = '#8A2BE2';
    secondaryColor = '#DA70D6';
    bgGradient = ['#E6E6FA', '#F8F8FF'];
  } else if (isOcean) {
    primaryColor = '#006994';
    secondaryColor = '#87CEEB';
    bgGradient = ['#B0E0E6', '#F0F8FF'];
  } else if (isNight) {
    primaryColor = '#191970';
    secondaryColor = '#FFD700';
    bgGradient = ['#2F2F2F', '#4B0082'];
  }
  
  // Elemento central baseado no contexto
  let mainElement = '';
  if (isForest) {
    mainElement = `
      <!-- Árvores da floresta -->
      <ellipse cx="200" cy="400" rx="30" ry="80" fill="${primaryColor}"/>
      <ellipse cx="320" cy="380" rx="25" ry="70" fill="${primaryColor}"/>
      <circle cx="200" cy="340" r="40" fill="${secondaryColor}"/>
      <circle cx="320" cy="330" r="35" fill="${secondaryColor}"/>
      <circle cx="256" cy="200" r="20" fill="#FFD700" opacity="0.8"/>
    `;
  } else if (isCastle) {
    mainElement = `
      <!-- Castelo -->
      <rect x="200" y="300" width="112" height="120" fill="${primaryColor}" stroke="#654321" stroke-width="3"/>
      <rect x="180" y="280" width="30" height="140" fill="${primaryColor}" stroke="#654321" stroke-width="2"/>
      <rect x="302" y="280" width="30" height="140" fill="${primaryColor}" stroke="#654321" stroke-width="2"/>
      <polygon points="180,280 195,250 210,280" fill="#8B0000"/>
      <polygon points="302,280 317,250 332,280" fill="#8B0000"/>
      <polygon points="200,300 256,270 312,300" fill="#8B0000"/>
      <rect x="235" y="350" width="20" height="30" fill="#654321"/>
      <circle cx="245" cy="365" r="2" fill="#FFD700"/>
    `;
  } else if (isDragon) {
    mainElement = `
      <!-- Dragão amigável -->
      <ellipse cx="256" cy="220" rx="60" ry="40" fill="${primaryColor}"/>
      <circle cx="230" cy="200" r="25" fill="${primaryColor}"/>
      <circle cx="282" cy="200" r="25" fill="${primaryColor}"/>
      <circle cx="225" cy="195" r="8" fill="#FFFFFF"/>
      <circle cx="287" cy="195" r="8" fill="#FFFFFF"/>
      <circle cx="225" cy="195" r="4" fill="#000000"/>
      <circle cx="287" cy="195" r="4" fill="#000000"/>
      <path d="M200,160 Q256,140 312,160" stroke="${secondaryColor}" stroke-width="8" fill="none"/>
      <ellipse cx="256" cy="280" rx="40" ry="60" fill="${secondaryColor}"/>
    `;
  } else if (isOcean) {
    mainElement = `
      <!-- Ondas do mar -->
      <path d="M50,350 Q150,330 250,350 T450,350" stroke="${primaryColor}" stroke-width="8" fill="none"/>
      <path d="M50,370 Q150,350 250,370 T450,370" stroke="${secondaryColor}" stroke-width="6" fill="none"/>
      <path d="M50,390 Q150,370 250,390 T450,390" stroke="${primaryColor}" stroke-width="4" fill="none"/>
      <circle cx="400" cy="150" r="40" fill="#FFD700" opacity="0.9"/>
      <circle cx="420" cy="170" r="15" fill="#FFFFFF" opacity="0.7"/>
    `;
  } else {
    // Elemento padrão - sol alegre
    mainElement = `
      <!-- Sol brilhante -->
      <circle cx="256" cy="200" r="50" fill="#FFD700" stroke="#FFA500" stroke-width="4"/>
      <path d="M256,100 L256,120 M356,200 L336,200 M156,200 L176,200 M256,280 L256,300" stroke="#FFA500" stroke-width="6"/>
      <path d="M321,135 L307,149 M205,149 L191,135 M321,265 L307,251 M205,251 L191,265" stroke="#FFA500" stroke-width="4"/>
      <circle cx="241" cy="185" r="8" fill="#FF6B6B"/>
      <circle cx="271" cy="185" r="8" fill="#FF6B6B"/>
      <path d="M236,220 Q256,240 276,220" stroke="#FF6B6B" stroke-width="4" fill="none"/>
    `;
  }
  
  // Decorações contextuais
  let decorations = '';
  if (isMagic) {
    decorations = `
      <polygon points="100,120 105,135 120,135 108,145 113,160 100,150 87,160 92,145 80,135 95,135" fill="#FFD700" opacity="0.8"/>
      <polygon points="400,100 405,115 420,115 408,125 413,140 400,130 387,140 392,125 380,115 395,115" fill="#FFD700" opacity="0.8"/>
      <circle cx="150" cy="300" r="3" fill="#DA70D6" opacity="0.9"/>
      <circle cx="360" cy="280" r="3" fill="#DA70D6" opacity="0.9"/>
      <circle cx="120" cy="250" r="2" fill="#FF69B4" opacity="0.8"/>
    `;
  } else if (isNight) {
    decorations = `
      <circle cx="400" cy="120" r="25" fill="#F0F8FF" opacity="0.9"/>
      <circle cx="405" cy="115" r="3" fill="#2F2F2F"/>
      <polygon points="100,80 105,95 120,95 108,105 113,120 100,110 87,120 92,105 80,95 95,95" fill="#FFD700" opacity="0.9"/>
      <polygon points="350,300 353,310 365,310 356,318 359,328 350,322 341,328 344,318 335,310 347,310" fill="#FFD700" opacity="0.7"/>
    `;
  }
  
  const svgContent = `
    <svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="contextBg${pageNumber}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgGradient[0]};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${bgGradient[1]};stop-opacity:0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Fundo temático -->
      <rect width="512" height="512" fill="url(#contextBg${pageNumber})"/>
      
      <!-- Elemento principal contextual -->
      ${mainElement}
      
      <!-- Decorações temáticas -->
      ${decorations}
      
      <!-- Título da história -->
      <text x="256" y="450" font-family="Comic Sans MS, cursive" font-size="20" font-weight="bold" text-anchor="middle" fill="#2C3E50" filter="url(#glow)">
        História do Theo
      </text>
      <text x="256" y="475" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#34495E">
        Página ${pageNumber} - Aventura Mágica
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgContent)}`;
};

// Função principal que tenta API real primeiro, depois fallback inteligente
export const generateImageWithHuggingFace = async (
  prompt: string,
  pageNumber = 1
): Promise<string> => {
  const hfToken = getHfToken();
  
  // Se não tem token Write válido, vai direto para SVG
  if (!hfToken || hfToken.length < 20 || hfToken === 'hf_public') {
    console.log(`⚠️ Token HF inválido ou ausente, usando SVG contextual`);
    return generateContextAwareSVG(prompt, pageNumber + 1);
  }
  
  console.log(`🚀 Tentando gerar imagem real com HF API para: "${prompt}"`);
  
  // Tenta usar a API real do Hugging Face
  try {
    const hf = new HfInference(hfToken);
    
    // Melhora o prompt para ser mais child-friendly
    const enhancedPrompt = `cute cartoon illustration, child-friendly, colorful, happy, ${prompt}, disney style, pixar style, no text, safe for children`;
    
    for (const model of WORKING_MODELS) {
      try {
        console.log(`🎨 Testando modelo: ${model}`);
        
        const response = await hf.textToImage({
          model,
          inputs: enhancedPrompt,
          parameters: {
            negative_prompt: "scary, dark, violence, inappropriate, text, watermark, signature",
            num_inference_steps: 25,
            guidance_scale: 7.5,
            width: 512,
            height: 512
          }
        });

        // Verifica se a resposta é válida
        if (response && response instanceof Blob && response.size > 1000) {
          const imageUrl = URL.createObjectURL(response);
          console.log(`✅ Imagem real gerada com sucesso usando ${model}!`);
          return imageUrl;
        } else {
          throw new Error(`Resposta inválida do modelo ${model}`);
        }
        
      } catch (modelError) {
        console.warn(`⚠️ Modelo ${model} falhou:`, modelError);
        // Continua para o próximo modelo
        continue;
      }
    }
    
    // Se chegou aqui, todos os modelos falharam
    console.log('🎨 Todos os modelos HF falharam, usando SVG contextual como fallback');
    return generateContextAwareSVG(prompt, pageNumber + 1);
    
  } catch (hfError) {
    console.warn('⚠️ Erro geral na API do Hugging Face:', hfError);
    return generateContextAwareSVG(prompt, pageNumber + 1);
  }
};

// Função para verificar disponibilidade do Hugging Face
export const checkHuggingFaceAvailability = async (): Promise<boolean> => {
  const hfToken = getHfToken();
  
  if (!hfToken || hfToken.length < 20) {
    console.log('❌ Token HF não configurado ou inválido');
    return false;
  }
  
  try {
    const hf = new HfInference(hfToken);
    
    // Testa com um prompt simples
    const testResponse = await hf.textToImage({
      model: WORKING_MODELS[0],
      inputs: "simple test image, colorful, child-friendly",
      parameters: {
        num_inference_steps: 10,
        width: 256,
        height: 256
      }
    });
    
    return testResponse instanceof Blob && testResponse.size > 500;
    
  } catch (error) {
    console.warn('⚠️ Teste de conectividade HF falhou:', error);
    return false;
  }
};

// Função para obter status do serviço
export const getHuggingFaceStatus = () => {
  const hfToken = getHfToken();
  
  return {
    hasToken: !!hfToken && hfToken.length > 20,
    tokenLength: hfToken ? hfToken.length : 0,
    isValidToken: hfToken && hfToken.startsWith('hf_') && hfToken.length > 30,
    availableModels: WORKING_MODELS.length,
    fallbackAvailable: true
  };
};