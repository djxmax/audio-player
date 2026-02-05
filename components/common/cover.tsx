import { Track } from "@/data/songs";
import { Music2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CoverProps {
  track?: Track;
  size?: number;
  icon?: ReactNode;
}

const sizeMap: Record<number, string> = {
  8: "w-8 h-8",
  12: "w-12 h-12",
  16: "w-16 h-16",
  24: "w-24 h-24",
  32: "w-32 h-32",
  48: "w-48 h-48",
  64: "w-64 h-64",
};

export default function Cover({ track, size = 24, icon }: CoverProps) {
  const sizeClass = sizeMap[size] || "w-24 h-24";

  return (
    <Card
      className={cn(
        "flex items-center justify-center bg-secondary overflow-hidden p-0",
        sizeClass,
      )}
    >
      {!track && <Music2 size={size} />}
      {track && (
        <div className="rounded-lg object-cover relative w-full h-full">
          <img
            src={track?.cover}
            alt={track?.title ?? ""}
            className="rounded-lg object-cover w-full h-full"
          />
          {icon && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              {icon}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
