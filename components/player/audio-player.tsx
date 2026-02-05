"use client";

import { useEffect, useRef, useState } from "react";
import { Track } from "@/data/songs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack, Volume2 } from "lucide-react"; // Shadcn utilise souvent Lucide pour les icônes

interface AudioPlayerProps {
  track: Track | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export default function AudioPlayer({ track, isPlaying, onTogglePlay }: AudioPlayerProps) {
  // 1. La référence à l'élément HTMLAudioElement
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState(0);

  // 2. Synchroniser l'état isPlaying avec l'API native .play()/.pause()
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log("Erreur de lecture :", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, track]); // Se redéclenche si isPlaying ou la musique change

  // 3. Mettre à jour la barre de progression
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(current);
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

  if (!track) return <p className="text-muted-foreground italic text-center">Aucun morceau sélectionné</p>;

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      {/* Balise audio cachée (notre moteur) */}
      <audio
        ref={audioRef}
        src={track.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => console.log("Musique terminée")}
      />

      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-4">
          <img src={track.cover} alt={track.title} className="w-48 h-48 rounded-lg shadow-lg object-cover" />
          
          <div className="text-center">
            <h3 className="font-bold text-xl">{track.title}</h3>
            <p className="text-sm text-muted-foreground">{track.artist}</p>
          </div>

          {/* Barre de progression (Slider Shadcn) */}
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleSliderChange}
            className="w-full cursor-pointer"
          />

          {/* Contrôles */}
          <div className="flex items-center gap-4 mt-2">
            <Button variant="ghost" size="icon"><SkipBack /></Button>
            
            <Button onClick={onTogglePlay} size="lg" className="rounded-full w-14 h-14">
              {isPlaying ? <Pause /> : <Play />}
            </Button>
            
            <Button variant="ghost" size="icon"><SkipForward /></Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}