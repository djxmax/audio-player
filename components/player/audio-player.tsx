"use client";

import { useEffect, useRef, useState } from "react";
import { Track } from "@/data/songs";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "@/components/player/progress-bar";
import TrackInfo from "./track-info";
import Controls from "./controls";
import SecondaryControls from "./secondary-controls";
import {
  usePlayerIsPlaying,
  usePlayerVolume,
  usePlayerActions,
} from "@/store/player-store";
import MobileDrawer from "../drawer/mobile/mobile-drawer";

interface AudioPlayerProps {
  track: Track | undefined;
}

export default function AudioPlayer({ track }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlaying = usePlayerIsPlaying();
  const volume = usePlayerVolume();
  const {
    setVolume,
    setIsPlaying,
    setCurrentPosition,
    setCurrentTime,
    setDuration,
  } = usePlayerActions();

  // État local pour le progress (ne cause pas de re-rendus du store)
  const [progress, setProgress] = useState(0);

  // Synchroniser l'état isPlaying avec l'API native .play()/.pause()
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.log("Erreur de lecture :", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(current);
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
      // Sauvegarder la position tous les 5 secondes seulement
      if (Math.floor(audioRef.current.currentTime) % 5 === 0) {
        setCurrentPosition(audioRef.current.currentTime);
      }
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
    <Card className="py-0 w-full mx-auto overflow-hidden">
      {/* Balise audio cachée (notre moteur) */}
      <audio
        ref={audioRef}
        src={track?.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => console.log("Musique terminée")}
      />
      <MobileDrawer
        trigger={
          <CardContent className="p-2 md:p-6">
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
                  className="hidden md:flex"
                />
                <Controls
                  isPlaying={isPlaying}
                  haveTrack={!!track}
                  onTogglePlay={() => setIsPlaying(!isPlaying)}
                  previousClassName="hidden md:block"
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
        }
      />
    </Card>
  );
}
