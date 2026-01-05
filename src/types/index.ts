export interface Entry {
  id: string;
  location: string;
  witnesses: string;
  circumstances: string;
  trigger: string;
  thoughts: string;
  bodyFeelings: string;
  actions: string;
  emoji: string;
  title: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NewEntry {
  location: string;
  witnesses: string;
  circumstances: string;
  trigger: string;
  thoughts: string;
  bodyFeelings: string;
  actions: string;
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

export const WITNESSES_OPTIONS = [
  'Один/одна',
  'С знакомыми',
  'С посторонними',
  'В толпе'
];

export const INITIAL_ENTRY: NewEntry = {
  location: '',
  witnesses: '',
  circumstances: '',
  trigger: '',
  thoughts: '',
  bodyFeelings: '',
  actions: '',
};

