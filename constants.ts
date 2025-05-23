import { StoryElementCategory, StoryElementOption } from './types';

export const STORY_ELEMENT_OPTIONS: Record<StoryElementCategory, StoryElementOption[]> = {
  [StoryElementCategory.HERO]: [
    { id: "robô aventureiro", name: "Robô aventureiro", emoji: "🤖" },
    { id: "dragão simpático", name: "Dragão simpático", emoji: "🐲" },
    { id: "astronauta corajoso", name: "Astronauta corajoso", emoji: "🧑‍🚀" },
    { id: "jogador de futebol habilidoso", name: "Jogador de futebol habilidoso", emoji: "⚽" },
    { id: "super-herói estiloso", name: "Super-herói estiloso", emoji: "🦸" },
    { id: "dinossauro amigo", name: "Dinossauro amigo", emoji: "🦖" },
    { id: "pirata bonzinho", name: "Pirata bonzinho", emoji: "🏴‍☠️" },
    { id: "menino inventor", name: "Menino inventor", emoji: "🧑‍🔬" },
    { id: "cavaleiro medieval", name: "Cavaleiro medieval", emoji: "🛡️" },
    { id: "ninja engraçado", name: "Ninja engraçado", emoji: "🥷" },
    { id: "detetive mirim", name: "Detetive mirim", emoji: "🕵️" },
    { id: "mágico aprendiz", name: "Mágico aprendiz", emoji: "🪄" },
    { id: "alienígena curioso", name: "Alienígena curioso", emoji: "👽" },
    { id: "lutador de karatê", name: "Lutador de karatê", emoji: "🥋" },
    { id: "macaco esportista", name: "Macaco esportista", emoji: "🐒" },
    { id: "bombeiro destemido", name: "Bombeiro destemido", emoji: "👨‍🚒" },
    { id: "monstro fofo", name: "Monstro fofo", emoji: "👾" },
    { id: "super cachorro/cão falante", name: "Super cachorro/cão falante", emoji: "🐕" },
    { id: "leão viajante", name: "Leão viajante", emoji: "🦁" },
    { id: "corredor de carros de corrida", name: "Corredor de carros de corrida", emoji: "🏎️" },
  ],
  [StoryElementCategory.PLACE]: [
    { id: "floresta encantada", name: "Floresta encantada", emoji: "🌳" },
    { id: "ilha secreta", name: "Ilha secreta", emoji: "🏝️" },
    { id: "espaço sideral", name: "Espaço sideral", emoji: "🌌" },
    { id: "reino submarino", name: "Reino submarino", emoji: "🐠" },
    { id: "castelo mágico", name: "Castelo mágico", emoji: "🏰" },
    { id: "cidade futurista", name: "Cidade futurista", emoji: "🏙️" },
    { id: "vulcão adormecido", name: "Vulcão adormecido", emoji: "🌋" },
    { id: "planeta de doces", name: "Planeta de doces", emoji: "🍬" },
    { id: "caverna misteriosa", name: "Caverna misteriosa", emoji: "🦇" },
    { id: "pradaria dos dinossauros", name: "Pradaria dos dinossauros", emoji: "🌿" },
    { id: "estádio de futebol gigante", name: "Estádio de futebol gigante", emoji: "🏟️" },
    { id: "selva colorida", name: "Selva colorida", emoji: "🦜" },
    { id: "vale das nuvens", name: "Vale das nuvens", emoji: "☁️" },
    { id: "vila dos robôs", name: "Vila dos robôs", emoji: "🔩" },
    { id: "mundo invertido", name: "Mundo invertido", emoji: "🙃" },
    { id: "terra dos brinquedos", name: "Terra dos brinquedos", emoji: "🧸" },
    { id: "montanha gelada", name: "Montanha gelada", emoji: "🏔️" },
    { id: "jardim dos dragões", name: "Jardim dos dragões", emoji: "🌸" },
    { id: "museu vivo", name: "Museu vivo", emoji: "🖼️" },
    { id: "parque de diversões fantástico", name: "Parque de diversões fantástico", emoji: "🎢" },
  ],
  [StoryElementCategory.ADVENTURE]: [
    { id: "encontrar um tesouro perdido", name: "Encontrar um tesouro perdido", emoji: "💎" },
    { id: "fazer um novo amigo inusitado", name: "Fazer um novo amigo inusitado", emoji: "🤝" },
    { id: "aprender um truque de magia", name: "Aprender um truque de magia", emoji: "✨" },
    { id: "salvar uma princesa/príncipe ou amigo em perigo", name: "Salvar um amigo em perigo", emoji: "🆘" },
    { id: "participar de uma corrida espacial", name: "Participar de uma corrida espacial", emoji: "🚀" },
    { id: "descobrir um portal mágico", name: "Descobrir um portal mágico", emoji: "🌀" },
    { id: "resgatar um bichinho desaparecido", name: "Resgatar um bichinho desaparecido", emoji: "🐾" },
    { id: "impedir que um vilão execute seu plano", name: "Impedir um plano maligno", emoji: "💥" },
    { id: "desvendar um mistério antigo", name: "Desvendar um mistério antigo", emoji: "📜" },
    { id: "salvar a floresta de um incêndio", name: "Salvar a floresta de um incêndio", emoji: "🔥" },
    { id: "ajudar uma cidade a voltar a sorrir", name: "Ajudar uma cidade a sorrir", emoji: "😊" },
    { id: "ganhar um torneio de esportes", name: "Ganhar um torneio de esportes", emoji: "🏆" },
    { id: "construir uma invenção maluca", name: "Construir uma invenção maluca", emoji: "⚙️" },
    { id: "fazer as pazes entre dragões e unicórnios", name: "Fazer pazes entre criaturas", emoji: "🦄" },
    { id: "escapar de uma armadilha", name: "Escapar de uma armadilha", emoji: "🏃" },
    { id: "explorar uma terra desconhecida", name: "Explorar uma terra desconhecida", emoji: "🗺️" },
    { id: "convencer monstros a não serem assustadores", name: "Amigar com monstros", emoji: "👹" },
    { id: "enfrentar o medo de altura/escuro/água", name: "Enfrentar um medo", emoji: "💪" },
    { id: "aprender a compartilhar brinquedos", name: "Aprender a compartilhar", emoji: "🎁" },
    { id: "salvar um festival que seria cancelado", name: "Salvar um festival", emoji: "🎪" },
  ],
  [StoryElementCategory.OUTCOME]: [
    { id: "grande festa feliz", name: "Grande festa feliz", emoji: "🎉" },
    { id: "lição de amizade", name: "Lição de amizade", emoji: "🧑‍🤝‍🧑" },
    { id: "torna-se guardião do lugar", name: "Torna-se guardião do lugar", emoji: "🌟" },
    { id: "novo mundo descoberto", name: "Novo mundo descoberto", emoji: "🧭" },
    { id: "sonho realizado", name: "Sonho realizado", emoji: "💖" },
    { id: "todos aprendem a trabalhar em equipe", name: "Aprendem a trabalhar em equipe", emoji: "🤝" },
    { id: "o vilão se torna amigo dos heróis", name: "Vilão vira amigo", emoji: "😄" },
    { id: "um segredo especial é revelado", name: "Segredo revelado", emoji: "🤫" },
    { id: "a turma promete novas aventuras", name: "Promessa de novas aventuras", emoji: "🎒" },
    { id: "herói recebe uma medalha/homenagem", name: "Herói recebe medalha", emoji: "🏅" },
    { id: "todos compartilham um lanche saboroso no final", name: "Lanche saboroso no final", emoji: "🍪" },
    { id: "uma nova amizade é celebrada", name: "Nova amizade celebrada", emoji: "🥳" },
    { id: "os pais ficam orgulhosos do herói", name: "Pais orgulhosos", emoji: "👨‍👩‍👦" },
    { id: "o lugar mágico é salvo para sempre", name: "Lugar mágico salvo", emoji: "🛡️" },
    { id: "o herói cria uma invenção revolucionária", name: "Invenção revolucionária", emoji: "💡" },
    { id: "o time aprende o valor do respeito", name: "Aprendem o valor do respeito", emoji: "🙏" },
    { id: "todos ganham habilidades especiais", name: "Ganham habilidades especiais", emoji: "🌠" },
    { id: "uma promessa de nunca desistir", name: "Promessa de não desistir", emoji: "✊" },
    { id: "árvore mágica floresce novamente", name: "Árvore mágica floresce", emoji: "🌷" },
    { id: "o herói recebe uma carta misteriosa para a próxima aventura", name: "Carta para próxima aventura", emoji: "✉️" },
    { id: "um festival acontece em homenagem ao herói", name: "Festival em homenagem", emoji: "🎊" },
    { id: "o herói encontra seu animal de estimação perdido", name: "Encontra pet perdido", emoji: "🐶" },
    { id: "todos aprendem a importância da honestidade", name: "Aprendem sobre honestidade", emoji: "💯" },
    { id: "o herói se despede, mas promete voltar", name: "Despedida com promessa", emoji: "👋" },
    { id: "uma surpresa aparece no horizonte", name: "Surpresa no horizonte", emoji: "🌅" },
  ],
};

export const GEMINI_TEXT_MODEL = 'gemini-2.5-flash-preview-04-17';
export const GEMINI_IMAGE_MODEL = 'imagen-3.0-generate-002';

export const PDF_PAGE_RENDER_ID_PREFIX = 'pdf-page-render-';

// Image generation configuration
export const IMAGE_PROVIDERS = {
  GEMINI: 'gemini',
  HUGGINGFACE: 'huggingface'
} as const;

export type ImageProvider = typeof IMAGE_PROVIDERS[keyof typeof IMAGE_PROVIDERS];

// Default image provider (Hugging Face é gratuito)
export const DEFAULT_IMAGE_PROVIDER: ImageProvider = IMAGE_PROVIDERS.HUGGINGFACE;

// Hugging Face models for child-friendly images - formato array para compatibilidade
export const HUGGINGFACE_MODELS = [
  'stabilityai/stable-diffusion-xl-base-1.0',
  'runwayml/stable-diffusion-v1-5',
  'prompthero/openjourney-v4'
];