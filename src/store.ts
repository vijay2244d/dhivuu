import { create } from 'zustand';

interface AppStore {
  isEnvelopeOpen: boolean;
  setEnvelopeOpen: (open: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  isEnvelopeOpen: false,
  setEnvelopeOpen: (open) => set({ isEnvelopeOpen: open }),
}));
