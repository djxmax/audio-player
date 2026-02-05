"use client";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { formatTime } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  currentTime?: number;
  duration?: number;
  handleSliderChange: (value: number[]) => void;
}

export default function ProgressBar({
  progress,
  currentTime,
  duration,
  handleSliderChange,
}: ProgressBarProps) {
  return (
    <div className="flex flex-row items-center gap-2 w-full">
      <Badge className="text-xs">{formatTime(currentTime)}</Badge>
      <Slider
        value={[progress]}
        max={100}
        step={0.1}
        onValueChange={handleSliderChange}
        className="w-full cursor-pointer"
      />
      <Badge className="text-xs">{formatTime(duration)}</Badge>
    </div>
  );
}
