import { create } from 'zustand';

interface UIState {
  activeTab: string;
  toastMessage: string | null;
  toastVisible: boolean;
  setActiveTab: (tab: string) => void;
  showToast: (message: string) => void;
  hideToast: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'home',
  toastMessage: null,
  toastVisible: false,

  setActiveTab: (tab) => set({ activeTab: tab }),

  showToast: (message) =>
    set({
      toastMessage: message,
      toastVisible: true,
    }),

  hideToast: () =>
    set({
      toastMessage: null,
      toastVisible: false,
    }),
}));
