import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

interface DrawerState {
  isDesktopDrawerOpen: boolean;
  toggleDesktopDrawer: () => void;
  closeDesktopDrawer: () => void;
  openDesktopDrawer: () => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  isDesktopDrawerOpen: true,
  toggleDesktopDrawer: () =>
    set((state) => ({ isDesktopDrawerOpen: !state.isDesktopDrawerOpen })),
  closeDesktopDrawer: () => set({ isDesktopDrawerOpen: false }),
  openDesktopDrawer: () => set({ isDesktopDrawerOpen: true }),
}));

// Sélecteur
export const useIsDesktopDrawerOpen = () =>
  useDrawerStore((state) => state.isDesktopDrawerOpen);
export const useDrawerActions = () =>
  useDrawerStore(
    useShallow((state) => ({
      toggleDesktopDrawer: state.toggleDesktopDrawer,
      closeDesktopDrawer: state.closeDesktopDrawer,
      openDesktopDrawer: state.openDesktopDrawer,
    })),
  );
