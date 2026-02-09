import { Track } from "@/data/songs";
import { TableCell, TableRow } from "@/components/ui/table";
import Cover from "../common/cover";
import { formatTime } from "@/lib/utils";
import { Play, AudioLines, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlaylistAddMenu from "./playlist-add-menu";

interface TableItemProps {
  track: Track;
  isActive?: boolean;
  isHovered?: boolean;
  onHoverChange?: (isHovered: boolean) => void;
  onClick?: (track: Track) => void;
  mode?: "library" | "playlist";
  onDeleteTrack?: (trackId: number) => void;
  onAddToPlaylist?: (playlistId: string) => void;
}

function getIcon(isActive?: boolean, isHovered?: boolean) {
  if (isActive) {
    return <AudioLines size={24} className="text-white" />;
  }
  if (isHovered) {
    return <Play size={24} className="text-white" />;
  }
}

export default function TableItem({
  track,
  isActive,
  isHovered,
  onHoverChange,
  onClick,
  mode = "library",
  onDeleteTrack,
  onAddToPlaylist,
}: TableItemProps) {
  return (
    <TableRow
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onClick={() => onClick && onClick(track)}
    >
      <TableCell>
        <Cover track={track} size={12} icon={getIcon(isActive, isHovered)} />
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <p className="font-bold">{track.title}</p>
          <p className="text-sm text-muted-foreground">{track.artist}</p>
        </div>
      </TableCell>
      <TableCell>{track.album ?? ""}</TableCell>
      <TableCell>{formatTime(track.duration)}</TableCell>
      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
        {mode === "library" ? (
          <PlaylistAddMenu
            trackId={track.id}
            onAddToPlaylist={onAddToPlaylist}
          />
        ) : (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:text-destructive"
            onClick={() => onDeleteTrack?.(track.id)}
          >
            <Trash2 size={16} />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}
