"use client";

import { useEffect, useState } from "react";
import { Playlist } from "@/data/playlists";
import { Track } from "@/data/songs";
import { usePlayerStore } from "@/store/player-store";
import { useFetchPlaylists } from "@/hooks/use-fetch-playlists";
import TrackList from "@/components/track-list/track-list";
import Cover from "../common/cover";

interface PlaylistContentProps {
  playlistId: string;
}

export default function PlaylistContent({ playlistId }: PlaylistContentProps) {
  const { currentTrack, setCurrentTrack, setIsPlaying } = usePlayerStore();
  const { playlists } = useFetchPlaylists();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const found = playlists.find((p) => p.id === playlistId);
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
        tracks: playlist.tracks.filter((t) => t.id !== trackId),
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
      <div className="flex gap-6 mb-8">
        <div className="flex-shrink-0">
          <Cover playlist={playlist} size={48} />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
          <p className="text-muted-foreground mb-4">{playlist.description}</p>
          <p className="text-sm text-muted-foreground">
            {playlist.tracks?.length || 0} chansons
          </p>
        </div>
      </div>
      <TrackList
        tracks={playlist.tracks || []}
        onSelect={handleSelectTrack}
        activeTrackId={currentTrack?.id}
        mode="playlist"
        onDeleteTrack={handleDeleteTrack}
      />
    </div>
  );
}
