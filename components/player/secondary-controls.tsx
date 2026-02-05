"use client";
import { Slider } from "@/components/ui/slider";

interface SecondaryControlsProps {
  volume: number;
  onVolumeChange: (value: number[]) => void;
}

export default function SecondaryControls({
  volume,
  onVolumeChange,
}: SecondaryControlsProps) {
  return (
    <div className="flex flex-row items-center justify-end gap-4 h-full">
      <Slider
        value={[volume]}
        max={100}
        step={1}
        onValueChange={onVolumeChange}
        className="cursor-pointer w-24"
      />
    </div>
  );
}
