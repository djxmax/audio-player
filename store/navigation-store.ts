import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ContentType = "library" | "playlist";

interface NavigationState {
  contentType: ContentType;
  selectedPlaylistId: string | null;
  playlistsRefreshKey: number;
  tracksRefreshKey: number;
  setContentType: (type: ContentType) => void;
  setSelectedPlaylist: (id: string) => void;
  setLibrary: () => void;
  invalidatePlaylists: () => void;
  invalidateTracks: () => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      contentType: "library",
      selectedPlaylistId: null,
      playlistsRefreshKey: 0,
      tracksRefreshKey: 0,
      setContentType: (type: ContentType) => set({ contentType: type }),
      setSelectedPlaylist: (id: string) =>
        set({ contentType: "playlist", selectedPlaylistId: id }),
      setLibrary: () =>
        set({ contentType: "library", selectedPlaylistId: null }),
      invalidatePlaylists: () =>
        set((state) => ({
          playlistsRefreshKey: state.playlistsRefreshKey + 1,
        })),
      invalidateTracks: () =>
        set((state) => ({
          tracksRefreshKey: state.tracksRefreshKey + 1,
        })),
    }),
    {
      name: "navigation-store",
    },
  ),
);
