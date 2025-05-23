import { StoryElementCategory } from './types';

export const GEMINI_TEXT_MODEL = 'gemini-1.5-flash';

export const STORY_ELEMENT_OPTIONS = {
  [StoryElementCategory.HERO]: [
    'um corajoso cavaleiro',
    'uma fada mágica',
    'um dragão amigável',
    'um pirata aventureiro',
    'uma princesa corajosa',
    'um mago sábio',
    'um explorador destemido',
    'uma sereia curiosa'
  ],
  [StoryElementCategory.PLACE]: [
    'um castelo encantado',
    'uma floresta mágica',
    'uma ilha misteriosa',
    'um reino distante',
    'uma montanha nevada',
    'um oceano profundo',
    'uma cidade nas nuvens',
    'uma caverna brilhante'
  ],
  [StoryElementCategory.ADVENTURE]: [
    'encontrar um tesouro perdido',
    'salvar um amigo em perigo',
    'resolver um mistério antigo',
    'derrotar um monstro malvado',
    'descobrir uma magia secreta',
    'ajudar criaturas mágicas',
    'explorar terras desconhecidas',
    'quebrar uma maldição'
  ],
  [StoryElementCategory.OUTCOME]: [
    'e viveu feliz para sempre',
    'e se tornou um herói lendário',
    'e descobriu o verdadeiro valor da amizade',
    'e aprendeu uma lição importante',
    'e encontrou sua verdadeira família',
    'e trouxe paz ao reino',
    'e ganhou poderes mágicos',
    'e se tornou o guardião da magia'
  ]
};

export const HUGGINGFACE_MODELS = [
  'stabilityai/stable-diffusion-xl-base-1.0',
  'runwayml/stable-diffusion-v1-5',
  'prompthero/openjourney-v4'
];