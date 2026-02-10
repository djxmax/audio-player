"use client";

import { useEffect } from "react";
import { usePlayerStore } from "@/store/player-store";

export default function TitleUpdater() {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  useEffect(() => {
    if (currentTrack) {
      document.title = `${currentTrack.title} - WaveWolf`;

      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: currentTrack.title,
          artist: currentTrack.artist,
          album: currentTrack.album,
          artwork: currentTrack.coverUrl
            ? [
                {
                  src: currentTrack.coverUrl,
                  sizes: "256x256",
                  type: "image/png",
                },
              ]
            : [],
        });

        navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
      }
    } else {
      document.title = "WaveWolf";
    }
  }, [currentTrack, isPlaying]);

  return null;
}
