"use client";

import { useEffect } from "react";
import { usePlayerStore } from "@/store/player-store";

export default function TitleUpdater() {
  const currentTrack = usePlayerStore((state) => state.currentTrack);

  useEffect(() => {
    if (currentTrack) {
      document.title = `${currentTrack.title} - WaveWolf`;
    } else {
      document.title = "WaveWolf";
    }
  }, [currentTrack]);

  return null;
}
