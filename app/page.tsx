"use client"; // Obligatoire car on utilise du state

import { useEffect, useState } from "react";
import { songs, Track } from "@/data/songs";
import AudioPlayer from "@/components/player/audio-player";
import TrackList from "@/components/track-list/track-list";
import Header from "@/components/header/header";
import { usePlayerStore } from "@/store/player-store";
import MainContent from "@/components/main-content/main-content";

export default function MusicPage() {
  const { currentTrack } = usePlayerStore();
  const [isMounted, setIsMounted] = useState(false);

  // Charger l'état depuis localStorage au montage (Zustand gère automatiquement la persistance)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col h-screen w-screen md:w-auto">
      <div className="flex-none px-1 pt-1 md:px-2 md:pt-2">
        <Header />
      </div>

      <div className="w-full flex-auto overflow-y-auto">
        <MainContent />
      </div>

      <div className="flex-none px-1 pb-1 md:px-2 md:pb-2">
        <AudioPlayer track={currentTrack} />
      </div>
    </div>
  );
}
