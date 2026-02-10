"use client";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";
import { usePlayerStore } from "@/store/player-store";

interface ControlsProps {
  isPlaying: boolean;
  haveTrack: boolean;
  onTogglePlay: () => void;
}

export default function Controls({
  isPlaying,
  haveTrack,
  onTogglePlay,
}: ControlsProps) {
  const {
    currentTrackIndex,
    playlistTracks,
    playPreviousTrack,
    playNextTrack,
  } = usePlayerStore();

  const canPlayPrevious = currentTrackIndex > 0;
  const canPlayNext = currentTrackIndex < playlistTracks.length - 1;

  return (
    <div className="flex items-center gap-4 mt-2">
      <Button
        variant="ghost"
        size="icon"
        className="hidden md:block"
        disabled={!canPlayPrevious}
        onClick={playPreviousTrack}
      >
        <SkipBack />
      </Button>

      <Button
        onClick={onTogglePlay}
        size="lg"
        className="rounded-full w-14 h-14"
        disabled={!haveTrack}
      >
        {isPlaying ? <Pause /> : <Play />}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled={!canPlayNext}
        onClick={playNextTrack}
      >
        <SkipForward />
      </Button>
    </div>
  );
}
