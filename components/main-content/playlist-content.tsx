"use client";

import { useEffect, useState } from "react";
import { Playlist } from "@/data/playlists";
import { Track } from "@/data/songs";
import { usePlayerStore } from "@/store/player-store";
import { useFetchPlaylists } from "@/hooks/use-fetch-playlists";
import TrackList from "@/components/track-list/track-list";
import PlaylistDetails from "./playlist-details";

interface PlaylistContentProps {
  playlistId: string;
}

export default function PlaylistContent({ playlistId }: PlaylistContentProps) {
  const { currentTrack, setCurrentTrack, setIsPlaying } = usePlayerStore();
  const { playlists } = useFetchPlaylists();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const found = playlists.find((p) => p.id === playlistId);
    console.log("found playlist:", found);
    setPlaylist(found || null);
  }, [playlistId, playlists]);

  const handleSelectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handleDeleteTrack = (trackId: number) => {
    if (playlist) {
      setPlaylist({
        ...playlist,
        songs: playlist.songs.filter((t) => t.id !== trackId),
      });
    }
  };

  if (!playlist) {
    return (
      <div className="p-6">
        <div>Playlist non trouvée</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <PlaylistDetails playlist={playlist} />
      <TrackList
        tracks={playlist.songs || []}
        onSelect={handleSelectTrack}
        activeTrackId={currentTrack?.id}
        mode="playlist"
        onDeleteTrack={handleDeleteTrack}
      />
    </div>
  );
}
