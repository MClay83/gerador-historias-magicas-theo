
export enum StoryElementCategory {
  HERO = "Herói",
  PLACE = "Lugar",
  ADVENTURE = "Aventura",
  OUTCOME = "Desfecho",
}

export interface StoryElementOption {
  id: string;
  name: string;
  emoji: string; // For visual flair in selection
}

export interface SelectedElements {
  [StoryElementCategory.HERO]: string | null;
  [StoryElementCategory.PLACE]: string | null;
  [StoryElementCategory.ADVENTURE]: string | null;
  [StoryElementCategory.OUTCOME]: string | null;
}

export interface StoryPage {
  pageNumber: number;
  text: string;
  imagePrompt: string;
  imageUrl?: string; // Base64 image data string or URL
}

export interface GeneratedStory {
  title: string;
  pages: StoryPage[];
}

// For Google Search grounding, if used (not in current scope but good to have)
export interface GroundingChunkWeb {
  uri: string;
  title: string;
}
export interface GroundingChunk {
  web: GroundingChunkWeb;
}
export interface GroundingMetadata {
  groundingChunks?: GroundingChunk[];
}
export interface CandidateWithGrounding {
  groundingMetadata?: GroundingMetadata;
  // other candidate properties
}