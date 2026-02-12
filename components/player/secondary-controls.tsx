"use client";
import { Slider } from "@/components/ui/slider";
import { Button } from "../ui/button";
import { PanelRightOpen } from "lucide-react";
import { useDrawerActions, useIsDesktopDrawerOpen } from "@/store/drawer-store";

interface SecondaryControlsProps {
  volume: number;
  onVolumeChange: (value: number[]) => void;
}

export default function SecondaryControls({
  volume,
  onVolumeChange,
}: SecondaryControlsProps) {
  const { openDesktopDrawer } = useDrawerActions();
  const isDesktopDrawerOpen = useIsDesktopDrawerOpen();
  return (
    <div className="flex flex-row items-center justify-end gap-4 h-full">
      <Slider
        value={[volume]}
        max={100}
        step={1}
        onValueChange={onVolumeChange}
        className="cursor-pointer w-24"
      />
      {!isDesktopDrawerOpen && (
        <Button
          className="hidden md:inline-flex"
          variant="outline"
          size="icon"
          onClick={openDesktopDrawer}
        >
          <PanelRightOpen />
        </Button>
      )}
    </div>
  );
}
