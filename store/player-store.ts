import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useShallow } from "zustand/react/shallow";
import { Track } from "@/data/songs";

interface PlayerState {
  currentTrack: Track | undefined;
  isPlaying: boolean;
  volume: number;
  currentPosition: number;
  currentTime: number;
  duration: number;
  playlistTracks: Track[];
  currentTrackIndex: number;

  setCurrentTrack: (track: Track | undefined) => void;
  setIsPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  setCurrentPosition: (position: number) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  togglePlay: () => void;
  setPlaylistTracks: (tracks: Track[]) => void;
  setCurrentTrackFromPlaylist: (track: Track, tracks: Track[]) => void;
  playNextTrack: () => void;
  playPreviousTrack: () => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentTrack: undefined,
      isPlaying: false,
      volume: 80,
      currentPosition: 0,
      currentTime: 0,
      duration: 0,
      playlistTracks: [],
      currentTrackIndex: -1,

      setCurrentTrack: (track) =>
        set({ currentTrack: track, currentPosition: 0 }),
      setIsPlaying: (playing) => set({ isPlaying: playing }),
      setVolume: (volume) => set({ volume }),
      setCurrentPosition: (position) => set({ currentPosition: position }),
      setCurrentTime: (time) => set({ currentTime: time }),
      setDuration: (duration) => set({ duration }),
      togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
      setPlaylistTracks: (tracks) => set({ playlistTracks: tracks }),
      setCurrentTrackFromPlaylist: (track, tracks) => {
        const index = tracks.findIndex((t) => t.id === track.id);
        set({
          currentTrack: track,
          currentPosition: 0,
          playlistTracks: tracks,
          currentTrackIndex: index,
        });
      },
      playNextTrack: () => {
        const state = get();
        const nextIndex = state.currentTrackIndex + 1;
        if (nextIndex < state.playlistTracks.length) {
          const nextTrack = state.playlistTracks[nextIndex];
          set({
            currentTrack: nextTrack,
            currentPosition: 0,
            currentTrackIndex: nextIndex,
          });
        }
      },
      playPreviousTrack: () => {
        const state = get();
        const prevIndex = state.currentTrackIndex - 1;
        if (prevIndex >= 0) {
          const prevTrack = state.playlistTracks[prevIndex];
          set({
            currentTrack: prevTrack,
            currentPosition: 0,
            currentTrackIndex: prevIndex,
          });
        }
      },
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
export const usePlayerPosition = () =>
  usePlayerStore((state) => state.currentPosition);
export const usePlayerCurrentTime = () =>
  usePlayerStore((state) => state.currentTime);
export const usePlayerDuration = () =>
  usePlayerStore((state) => state.duration);
export const usePlayerActions = () =>
  usePlayerStore(
    useShallow((state) => ({
      setCurrentTrack: state.setCurrentTrack,
      setIsPlaying: state.setIsPlaying,
      setVolume: state.setVolume,
      setCurrentPosition: state.setCurrentPosition,
      setCurrentTime: state.setCurrentTime,
      setDuration: state.setDuration,
      togglePlay: state.togglePlay,
    })),
  );
