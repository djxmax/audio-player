"use client";

import { useEffect, useState } from "react";
import { Playlist } from "@/data/playlists";
import { Track } from "@/data/songs";
import { usePlayerStore } from "@/store/player-store";
import { useFetchPlaylists } from "@/hooks/use-fetch-playlists";
import { useNavigationStore } from "@/store/navigation-store";
import TrackList from "@/components/track-list/track-list";
import PlaylistDetails from "./playlist-details";

interface PlaylistContentProps {
  playlistId: string;
}

export default function PlaylistContent({ playlistId }: PlaylistContentProps) {
  const {
    currentTrack,
    setCurrentTrack,
    setIsPlaying,
    setCurrentTrackFromPlaylist,
  } = usePlayerStore();
  const { playlists } = useFetchPlaylists();
  const { setLibrary, invalidatePlaylists } = useNavigationStore();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    const found = playlists.find((p) => p.id === playlistId);
    console.log("found playlist:", found);
    setPlaylist(found || null);
  }, [playlistId, playlists]);

  const handleSelectTrack = (track: Track) => {
    if (playlist && playlist.songs) {
      setCurrentTrackFromPlaylist(track, playlist.songs);
    } else {
      setCurrentTrack(track);
    }
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
    <div className="w-full p-1 md:p-6">
      <PlaylistDetails
        playlist={playlist}
        onPlaylistUpdate={(updatedPlaylist) => {
          setPlaylist(updatedPlaylist);
        }}
        onDelete={() => {
          invalidatePlaylists();
          setLibrary();
        }}
      />
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
