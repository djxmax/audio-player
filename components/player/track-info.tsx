"use client";
import { Track } from "@/data/songs";
import { Music2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TrackInfoProps {
  track?: Track;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      <Card className="w-24 h-24 flex items-center justify-center">
        {!track && <Music2 size={48} />}
        {track && (
          <img
            src={track?.cover}
            alt={track?.title ?? ""}
            className="rounded-lg object-cover"
          />
        )}
      </Card>

      <div className="text-left">
        <h3 className="font-bold text-xl">{track?.title ?? ""}</h3>
        <p className="text-sm text-muted-foreground">{track?.artist ?? ""}</p>
        {track?.album && (
          <p className="text-sm text-muted-foreground">{track?.album}</p>
        )}
      </div>
    </div>
  );
}
