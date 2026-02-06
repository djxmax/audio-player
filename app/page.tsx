"use client"; // Obligatoire car on utilise du state

import { useState, useEffect } from "react";
import { songs, Track } from "@/data/songs"; // On définit le type Track dans data/songs
import AudioPlayer from "@/components/player/audio-player";
import TrackList from "@/components/track-list/track-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import Header from "@/components/header/header";

export default function MusicPage() {
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(
    undefined,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  // Charger l'état depuis localStorage au montage
  useEffect(() => {
    const savedTrackId = localStorage.getItem("currentTrackId");
    const savedIsPlaying = localStorage.getItem("isPlaying");
    const savedPosition = localStorage.getItem("currentPosition");

    if (savedTrackId) {
      const track = songs.find((t) => t.id === parseInt(savedTrackId));
      if (track) {
        setCurrentTrack(track);
        // On stocke la position pour la restaurer dans AudioPlayer
        if (savedPosition) {
          sessionStorage.setItem("restorePosition", savedPosition);
        }
      }
    }

    if (savedIsPlaying === "true") {
      setIsPlaying(true);
    }

    setIsMounted(true);
  }, []);

  // Sauvegarder l'état dans localStorage à chaque changement
  useEffect(() => {
    if (isMounted && currentTrack) {
      localStorage.setItem("currentTrackId", String(currentTrack.id));
    }
  }, [currentTrack, isMounted]);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("isPlaying", String(isPlaying));
    }
  }, [isPlaying, isMounted]);

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    sessionStorage.removeItem("restorePosition");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="sticky top-0 bg-background px-2 pt-2">
        <Header />
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <TrackList
            tracks={songs}
            onSelect={handleSelectTrack}
            activeTrackId={currentTrack?.id}
          />
        </ScrollArea>
      </div>

      <div className="shadow-lg px-2 pb-2">
        <AudioPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />
      </div>
    </div>
  );
}
