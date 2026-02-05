"use client"; // Obligatoire car on utilise du state

import { useState } from "react";
import { songs, Track } from "@/data/songs"; // On définit le type Track dans data/songs
import AudioPlayer from "@/components/player/audio-player";
import TrackList from "@/components/track-list/track-list";

export default function MusicPage() {
  // TypeScript sait que currentTrack est soit un objet Track, soit null
  let track: Track | null = songs[0] || null; // On prend la première chanson ou null si la liste est vide
  const [currentTrack, setCurrentTrack] = useState<Track | undefined>(
    track || undefined,
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="container mx-auto py-10 flex flex-col gap-8 flex-1 overflow-y-auto">
        <h1 className="text-4xl font-bold text-center">Audio player dev</h1>

        <div>
          <TrackList
            tracks={songs}
            onSelect={handleSelectTrack}
            activeTrackId={currentTrack?.id}
          />
        </div>
      </main>

      <div className="shadow-lg p-2">
        <AudioPlayer
          track={currentTrack}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
        />
      </div>
    </div>
  );
}
