import { create } from "zustand";
import { Track } from "@/data/songs";

interface SearchState {
  query: string;
  results: Track[];
  setQuery: (query: string) => void;
  setResults: (results: Track[]) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  results: [],
  setQuery: (query: string) => set({ query }),
  setResults: (results: Track[]) => set({ results }),
  clearSearch: () => set({ query: "", results: [] }),
}));
