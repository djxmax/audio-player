"use client";

import { useEffect, useState } from "react";
import { Playlist } from "@/data/playlists";
import { Track } from "@/data/songs";
import { usePlayerStore } from "@/store/player-store";
import { useFetchPlaylists } from "@/hooks/use-fetch-playlists";
import TrackList from "@/components/track-list/track-list";
import { Card } from "@/components/ui/card";

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
        <div className="w-40 h-40 flex-shrink-0">
          <Card className="w-full h-full overflow-hidden p-0 bg-secondary flex items-center justify-center">
            <img
              src={playlist.coverUrl}
              alt={playlist.name}
              className="w-full h-full object-cover"
            />
          </Card>
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
        onSelect={handleSelectTrack}
        activeTrackId={currentTrack?.id}
      />
    </div>
  );
}
