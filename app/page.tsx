"use client"; // Obligatoire car on utilise du state

import { useEffect, useState } from "react";
import { songs, Track } from "@/data/songs";
import AudioPlayer from "@/components/player/audio-player";
import TrackList from "@/components/track-list/track-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/header/header";
import { usePlayerStore } from "@/store/player-store";
import MainContent from "@/components/main-content/main-content";

export default function MusicPage() {
  const { currentTrack, setCurrentTrack, setIsPlaying } = usePlayerStore();
  const [isMounted, setIsMounted] = useState(false);

  // Charger l'état depuis localStorage au montage (Zustand gère automatiquement la persistance)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 bg-background px-1 pt-1 md:px-2 md:pt-2">
        <Header />
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <MainContent />
        </ScrollArea>
      </div>

      <div className="shadow-lg px-1 pb-1 md:px-2 md:pb-2">
        <AudioPlayer track={currentTrack} />
      </div>
    </div>
  );
}
