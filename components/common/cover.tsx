import { Track } from "@/data/songs";
import { Music2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Playlist } from "@/data/playlists";

interface CoverProps {
  track?: Track;
  playlist?: Playlist;
  className?: string;
  icon?: ReactNode;
  iconSize?: number;
}

export default function Cover({
  track,
  playlist,
  className = "w-24 h-24",
  icon,
}: CoverProps) {
  let coverUrl = track?.coverUrl || playlist?.coverUrl;
  let alt = track?.title || playlist?.name || "Cover";

  return (
    <Card
      className={cn(
        "flex items-center justify-center bg-secondary overflow-hidden p-0",
        className,
      )}
    >
      {!coverUrl ? (
        <Music2 size={16} />
      ) : (
        <div className="rounded-lg object-cover relative w-full h-full">
          <img
            src={coverUrl}
            alt={alt}
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
