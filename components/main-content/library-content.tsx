"use client";

import { Track } from "@/data/songs";
import { usePlayerStore } from "@/store/player-store";
import { useFetchTracks } from "@/hooks/use-fetch-tracks";
import TrackList from "@/components/track-list/track-list";

export default function LibraryContent() {
  const { currentTrack, setCurrentTrack, setIsPlaying } = usePlayerStore();
  const { tracks, loading, error } = useFetchTracks();

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Bibliothèque</h1>
      <TrackList
        tracks={tracks}
        onSelect={handleSelectTrack}
        activeTrackId={currentTrack?.id}
        loading={loading}
        error={error}
      />
    </div>
  );
}
