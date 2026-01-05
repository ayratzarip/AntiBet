export interface Entry {
  id: string;
  situation: string;
  thoughts: string;
  bodyFeelings: string;
  bodyZones: string[];
  consequences: string;
  withoutProblem: string;
  emoji: string;
  title: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewEntry {
  situation: string;
  thoughts: string;
  bodyFeelings: string;
  bodyZones: string[];
  consequences: string;
  withoutProblem: string;
}

export type Theme = 'light' | 'dark';

export interface AppContextType {
  entries: Entry[];
  currentEntry: NewEntry;
  isLoading: boolean;
  theme: Theme;
  editingEntryId: string | null;
  setCurrentEntry: (entry: NewEntry) => void;
  updateCurrentEntry: <K extends keyof NewEntry>(key: K, value: NewEntry[K]) => void;
  saveEntry: () => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  loadEntries: () => Promise<void>;
  resetCurrentEntry: () => void;
  loadEntryForEditing: (id: string) => void;
  updateExistingEntry: (newCreatedAt?: string) => Promise<void>;
}

export const EMOJIS = ['😰', '😨', '😔', '😌', '😤', '😢', '😊', '🤔'];

export const BODY_ZONES = ['Голова', 'Грудь', 'Живот', 'Плечи', 'Руки', 'Ноги', 'Спина', 'Горло'];

export const INITIAL_ENTRY: NewEntry = {
  situation: '',
  thoughts: '',
  bodyFeelings: '',
  bodyZones: [],
  consequences: '',
  withoutProblem: '',
};

