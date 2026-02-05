"use client";
import { Track } from "@/data/songs";
import Cover from "../common/cover";

interface TrackInfoProps {
  track?: Track;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="flex flex-row items-center gap-4">
      <Cover track={track} size={24} />

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
