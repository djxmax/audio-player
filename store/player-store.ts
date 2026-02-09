import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { Track } from "@/data/songs";

interface PlayerState {
  currentTrack: Track | undefined;
  isPlaying: boolean;
  volume: number;
  currentPosition: number;

  setCurrentTrack: (track: Track | undefined) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentPosition: (position: number) => void;
  togglePlay: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      currentTrack: undefined,
      isPlaying: false,
      volume: 80,
      currentPosition: 0,

      setCurrentTrack: (track) =>
        set({ currentTrack: track, currentPosition: 0 }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setVolume: (volume) => set({ volume }),
      setCurrentPosition: (position) => set({ currentPosition: position }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
    }),
    {
      name: "player-storage",
      partialize: (state) => ({
        currentTrack: state.currentTrack,
        isPlaying: state.isPlaying,
        currentPosition: state.currentPosition,
        volume: state.volume,
      }),
    },
  ),
);

// Sélecteurs pour éviter les re-rendus inutiles
export const usePlayerTrack = () =>
  usePlayerStore((state) => state.currentTrack);
export const usePlayerIsPlaying = () =>
  usePlayerStore((state) => state.isPlaying);
export const usePlayerVolume = () => usePlayerStore((state) => state.volume);
export const usePlayerActions = () =>
  usePlayerStore(
    useShallow((state) => ({
      setCurrentTrack: state.setCurrentTrack,
      setIsPlaying: state.setIsPlaying,
      setVolume: state.setVolume,
      setCurrentPosition: state.setCurrentPosition,
      togglePlay: state.togglePlay,
    })),
  );
