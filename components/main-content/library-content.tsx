"use client";

import { Track, songs } from "@/data/songs";
import { usePlayerStore } from "@/store/player-store";
import TrackList from "@/components/track-list/track-list";

export default function LibraryContent() {
  const { currentTrack, setCurrentTrack, setIsPlaying } = usePlayerStore();

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bibliothèque</h1>
      <TrackList
        onSelect={handleSelectTrack}
        activeTrackId={currentTrack?.id}
      />
    </div>
  );
}
