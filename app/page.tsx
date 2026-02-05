"use client"; // Obligatoire car on utilise du state

import { useState } from "react";
import { songs, Track } from "@/data/songs"; // On définit le type Track dans data/songs
import AudioPlayer from "@/components/player/audio-player";
import TrackList from "@/components/track-list/track-list";

export default function MusicPage() {
  // TypeScript sait que currentTrack est soit un objet Track, soit null
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <main className="container mx-auto py-10 flex flex-col gap-8">
      <h1 className="text-4xl font-bold text-center">Mon Soundboard Next.js</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* La liste des morceaux (2 colonnes sur 3) */}
        <div className="md:col-span-2">
          <TrackList 
            tracks={songs} 
            onSelect={handleSelectTrack} 
            activeTrackId={currentTrack?.id} 
          />
        </div>

        {/* Le lecteur audio fixe ou sur le côté */}
        <div className="md:col-span-1">
          <AudioPlayer 
            track={currentTrack} 
            isPlaying={isPlaying} 
            onTogglePlay={() => setIsPlaying(!isPlaying)} 
          />
        </div>
      </div>
    </main>
  );
}