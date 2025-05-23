import { HfInference } from '@huggingface/inference';
import { HUGGINGFACE_MODELS } from '../constants';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_TOKEN);

// Função para gerar SVG contextual baseado no prompt
function generateContextAwareSVG(prompt: string, pageIndex: number): string {
  // Analisa o prompt para determinar elementos visuais
  const promptLower = prompt.toLowerCase();
  
  let primaryColor = '#4A90E2';
  let secondaryColor = '#E8F4FD';
  let elements: string[] = [];
  let background = '#F0F8FF';
  
  // Determina cores e elementos baseados no contexto
  if (promptLower.includes('forest') || promptLower.includes('tree') || promptLower.includes('nature')) {
    primaryColor = '#4A7C59';
    secondaryColor = '#A8D8A8';
    background = '#E8F5E8';
    elements.push('<circle cx="120" cy="180" r="30" fill="#228B22"/>');
    elements.push('<circle cx="180" cy="160" r="35" fill="#32CD32"/>');
    elements.push('<circle cx="350" cy="170" r="28" fill="#228B22"/>');
    elements.push('<rect x="115" y="200" width="10" height="40" fill="#8B4513"/>');
    elements.push('<rect x="175" y="190" width="10" height="45" fill="#8B4513"/>');
  } else if (promptLower.includes('castle') || promptLower.includes('tower') || promptLower.includes('kingdom')) {
    primaryColor = '#8B4513';
    secondaryColor = '#D2B48C';
    background = '#F5DEB3';
    elements.push('<rect x="200" y="150" width="120" height="120" fill="#8B4513"/>');
    elements.push('<polygon points="200,150 260,100 320,150" fill="#DC143C"/>');
    elements.push('<rect x="220" y="180" width="15" height="30" fill="#654321"/>');
    elements.push('<circle cx="180" cy="140" r="15" fill="#FFD700"/>');
  } else if (promptLower.includes('ocean') || promptLower.includes('sea') || promptLower.includes('water')) {
    primaryColor = '#0066CC';
    secondaryColor = '#87CEEB';
    background = '#E0F6FF';
    elements.push('<path d="M 0 250 Q 100 230 200 250 T 400 250 T 600 250" stroke="#0066CC" stroke-width="3" fill="none"/>');
    elements.push('<path d="M 0 270 Q 150 250 300 270 T 600 270" stroke="#4169E1" stroke-width="2" fill="none"/>');
    elements.push('<circle cx="400" cy="120" r="20" fill="#FFD700"/>');
  } else if (promptLower.includes('magic') || promptLower.includes('spell') || promptLower.includes('wizard')) {
    primaryColor = '#9932CC';
    secondaryColor = '#E6E6FA';
    background = '#F8F8FF';
    elements.push('<polygon points="256,80 266,110 296,110 274,130 284,160 256,140 228,160 238,130 216,110 246,110" fill="#FFD700"/>');
    elements.push('<circle cx="200" cy="200" r="3" fill="#9932CC"><animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite"/></circle>');
    elements.push('<circle cx="350" cy="180" r="3" fill="#FF69B4"><animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite"/></circle>');
  } else if (promptLower.includes('dragon') || promptLower.includes('fire') || promptLower.includes('monster')) {
    primaryColor = '#DC143C';
    secondaryColor = '#FFB6C1';
    background = '#FFF0F5';
    elements.push('<ellipse cx="250" cy="200" rx="60" ry="30" fill="#DC143C"/>');
    elements.push('<circle cx="230" cy="190" r="8" fill="#000"/>');
    elements.push('<circle cx="270" cy="190" r="8" fill="#000"/>');
    elements.push('<polygon points="180,200 200,180 200,220" fill="#DC143C"/>');
  }
  
  // Adiciona elementos base
  elements.push(`<text x="256" y="320" font-family="Arial, sans-serif" font-size="18" font-weight="bold" text-anchor="middle" fill="${primaryColor}">História do Theo</text>`);
  elements.push(`<text x="256" y="345" font-family="Arial, sans-serif" font-size="14" text-anchor="middle" fill="#666">Página ${pageIndex + 1}</text>`);
  
  const svg = `
    <svg width="512" height="384" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="384" fill="${background}"/>
      <circle cx="256" cy="180" r="80" fill="${secondaryColor}" opacity="0.3"/>
      ${elements.join('\n      ')}
      <rect x="0" y="0" width="512" height="384" fill="none" stroke="${primaryColor}" stroke-width="2"/>
    </svg>
  `;
  
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export async function generateImageWithHuggingFace(prompt: string, pageIndex: number): Promise<string> {
  const token = import.meta.env.VITE_HUGGINGFACE_TOKEN;
  
  if (!token) {
    console.warn('❌ Token do Hugging Face não configurado, usando fallback SVG');
    return generateContextAwareSVG(prompt, pageIndex);
  }

  // Otimiza o prompt para gerar melhores imagens
  const optimizedPrompt = `children's book illustration, ${prompt}, colorful, friendly, safe for kids, digital art style, bright colors, simple shapes`;
  
  for (let modelIndex = 0; modelIndex < HUGGINGFACE_MODELS.length; modelIndex++) {
    const modelId = HUGGINGFACE_MODELS[modelIndex];
    
    try {
      console.log(`🎨 Tentando modelo ${modelIndex + 1}/${HUGGINGFACE_MODELS.length}: ${modelId}`);
      
      const blob = await hf.textToImage({
        model: modelId,
        inputs: optimizedPrompt,
        parameters: {
          negative_prompt: "scary, dark, violent, inappropriate, adult content",
          num_inference_steps: 20,
          guidance_scale: 7.5,
          width: 512,
          height: 384
        }
      });
      
      if (blob && blob.size > 0) {
        const imageUrl = URL.createObjectURL(blob);
        console.log(`✅ Imagem gerada com sucesso usando ${modelId}`);
        return imageUrl;
      } else {
        throw new Error('Blob vazio retornado pelo modelo');
      }
      
    } catch (error) {
      console.warn(`⚠️ Modelo ${modelId} falhou:`, error);
      
      if (modelIndex === HUGGINGFACE_MODELS.length - 1) {
        console.log('🎨 Todos os modelos falharam, usando SVG contextual como fallback');
        return generateContextAwareSVG(prompt, pageIndex);
      }
      
      // Tenta próximo modelo
      continue;
    }
  }
  
  // Fallback final (não deveria chegar aqui)
  return generateContextAwareSVG(prompt, pageIndex);
}