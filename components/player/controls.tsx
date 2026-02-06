"use client";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"; // Shadcn utilise souvent Lucide pour les icônes

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
  return (
    <div className="flex items-center gap-4 mt-2">
      <Button variant="ghost" size="icon" className="hidden md:block">
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

      <Button variant="ghost" size="icon">
        <SkipForward />
      </Button>
    </div>
  );
}
