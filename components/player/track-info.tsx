"use client";
import { Track } from "@/data/songs";
import Cover from "../common/cover";

interface TrackInfoProps {
  track?: Track;
}

export default function TrackInfo({ track }: TrackInfoProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <Cover
        track={track}
        className="min-w-16 max-w-16 w-16 h-16 md:w-24 md:min-w-24 md:max-w-24 md:h-24"
      />

      <div className="text-left">
        <h3 className="font-bold text-xl truncate">{track?.title ?? ""}</h3>
        <p className="text-sm text-muted-foreground">{track?.artist ?? ""}</p>
        {track?.album && (
          <p className="text-sm text-muted-foreground">{track?.album}</p>
        )}
      </div>
    </div>
  );
}
