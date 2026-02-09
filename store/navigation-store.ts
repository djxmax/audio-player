import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ContentType = "library" | "playlist";

interface NavigationState {
  contentType: ContentType;
  selectedPlaylistId: string | null;
  setContentType: (type: ContentType) => void;
  setSelectedPlaylist: (id: string) => void;
  setLibrary: () => void;
}

export const useNavigationStore = create<NavigationState>()(
  persist(
    (set) => ({
      contentType: "library",
      selectedPlaylistId: null,
      setContentType: (type: ContentType) => set({ contentType: type }),
      setSelectedPlaylist: (id: string) =>
        set({ contentType: "playlist", selectedPlaylistId: id }),
      setLibrary: () =>
        set({ contentType: "library", selectedPlaylistId: null }),
    }),
    {
      name: "navigation-store",
    },
  ),
);
