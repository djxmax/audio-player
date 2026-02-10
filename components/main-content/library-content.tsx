"use client";

import { Track } from "@/data/songs";
import { usePlayerStore } from "@/store/player-store";
import { useFetchTracks } from "@/hooks/use-fetch-tracks";
import { useFetchPlaylists } from "@/hooks/use-fetch-playlists";
import { useSearchStore } from "@/store/search-store";
import TrackList from "@/components/track-list/track-list";

export default function LibraryContent() {
  const { currentTrack, setCurrentTrack, setIsPlaying } = usePlayerStore();
  const { tracks, loading, error } = useFetchTracks();
  const { playlists } = useFetchPlaylists();
  const { results: searchResults } = useSearchStore();

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  // Afficher les résultats de recherche s'il y en a, sinon afficher tous les tracks
  const displayTracks = searchResults.length > 0 ? searchResults : tracks;

  return (
    <div className="p-1 md:p-6">
      <h1 className="text-3xl font-bold mb-6">Bibliothèque</h1>
      <TrackList
        tracks={displayTracks}
        onSelect={handleSelectTrack}
        activeTrackId={currentTrack?.id}
        loading={loading}
        error={error}
        playlists={playlists}
      />
    </div>
  );
}
