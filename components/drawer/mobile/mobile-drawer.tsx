"use client";

import { useState, useRef, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import Cover from "@/components/common/cover";
import ProgressBar from "@/components/player/progress-bar";
import Controls from "@/components/player/controls";
import { Track } from "@/data/songs";
import {
  usePlayerActions,
  usePlayerCurrentTime,
  usePlayerDuration,
  usePlayerIsPlaying,
  usePlayerPosition,
  usePlayerTrack,
  usePlayerVolume,
} from "@/store/player-store";

interface MobileDrawerProps {
  trigger: React.ReactNode;
}

export default function MobileDrawer({ trigger }: MobileDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const isMobile = useIsMobile();

  const isPlaying = usePlayerIsPlaying();
  const volume = usePlayerVolume();
  const track = usePlayerTrack();
  const currentPosition = usePlayerPosition();
  const currentTime = usePlayerCurrentTime(); // audioRef.current.currentTime
  const duration = usePlayerDuration();
  const { setVolume, setIsPlaying, setCurrentPosition } = usePlayerActions();

  const snapPoints = [1];
  const [snap, setSnap] = useState<number | string | null>(snapPoints[0]);

  // Calculer 80% de la largeur de l'écran
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth * 0.8);
    };

    handleResize(); // Initialiser au premier rendu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleOpenChange = (open: boolean) => {
    // Ne permettre l'ouverture que si on est en mode mobile
    if (open && !isMobile) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={handleOpenChange}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="!max-h-[100vh]">
        <div className="h-screen w-full flex flex-col">
          <DrawerHeader>
            <DrawerTitle>Lecture en cours</DrawerTitle>
          </DrawerHeader>
          <div className="flex-auto flex flex-col gap-4 items-center justify-center">
            <div
              className="flex items-center justify-center"
              style={
                { "--cover-size": `${windowWidth}px` } as React.CSSProperties
              }
            >
              <Cover
                track={track}
                className="w-[var(--cover-size)] h-[var(--cover-size)]"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center text-center">
              <h3 className="font-bold text-xl truncate">
                {track?.title ?? ""}
              </h3>
              <p className="text-sm text-muted-foreground">
                {track?.artist ?? ""}
              </p>
              {track?.album && (
                <p className="text-sm text-muted-foreground">{track?.album}</p>
              )}
            </div>
          </div>
          <DrawerFooter>
            <div className="w-full flex flex-col mb-16 gap-8 justify-center items-center">
              <ProgressBar
                progress={currentPosition}
                currentTime={currentTime}
                duration={duration}
                handleSliderChange={(value) => setCurrentPosition(value[0])}
              />
              <Controls
                isPlaying={isPlaying}
                haveTrack={!!track}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
              />
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
