"use client";

import { useEffect, useRef, useState } from "react";
import { Track } from "@/data/songs";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/components/player/progress-bar";
import TrackInfo from "./track-info";
import Controls from "./controls";
import SecondaryControls from "./secondary-controls";

interface AudioPlayerProps {
  track: Track | undefined;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function AudioPlayer({
  track,
  isPlaying,
  onTogglePlay,
}: AudioPlayerProps) {
  // 1. La référence à l'élément HTMLAudioElement
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80); // Volume entre 0 et 1

  // 2. Synchroniser l'état isPlaying avec l'API native .play()/.pause()
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.log("Erreur de lecture :", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track]); // Se redéclenche si isPlaying ou la musique change

  // Restaurer la position de lecture au montage
  useEffect(() => {
    if (!audioRef.current || !track) return;

    const restorePosition = sessionStorage.getItem("restorePosition");
    if (restorePosition) {
      const position = parseFloat(restorePosition);
      audioRef.current.currentTime = position;
      sessionStorage.removeItem("restorePosition");
    }
  }, [track]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(current);
      // Sauvegarder la position actuelle
      localStorage.setItem(
        "currentPosition",
        String(audioRef.current.currentTime),
      );
    }
  };

  // 4. Permettre de cliquer sur la barre pour changer le moment du morceau
  const handleSliderChange = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  return (
    <Card className="w-full mx-auto overflow-hidden">
      {/* Balise audio cachée (notre moteur) */}
      <audio
        ref={audioRef}
        src={track?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => console.log("Musique terminée")}
      />

      <CardContent className="px-6">
        <div className="flex flex-row items-center gap-4">
          <div className="flex-1 md:flex-1/4">
            <TrackInfo track={track} />
          </div>
          <div className="flex-none md:flex-1/2 flex flex-col items-center gap-4">
            <ProgressBar
              progress={progress}
              currentTime={audioRef.current?.currentTime}
              duration={audioRef.current?.duration}
              handleSliderChange={handleSliderChange}
            />
            <Controls
              isPlaying={isPlaying}
              haveTrack={!!track}
              onTogglePlay={onTogglePlay}
            />
          </div>
          <div className="hidden md:flex md:flex-1/4 md:justify-end">
            <SecondaryControls
              volume={volume}
              onVolumeChange={(value) => {
                setVolume(value[0]);
                if (audioRef.current) {
                  audioRef.current.volume = value[0] / 100;
                }
              }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
