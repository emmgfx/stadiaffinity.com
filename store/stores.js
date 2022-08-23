import create from "zustand";

export const useSearchStore = create((set) => ({
  term: "",
  setTerm: (term) => set({ term }),
}));
