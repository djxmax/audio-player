import { Track } from "@/data/songs";
import { TableCell, TableRow } from "@/components/ui/table";
import Cover from "../common/cover";
import { formatTime } from "@/lib/utils";
import { Play, AudioLines } from "lucide-react";

interface TableItemProps {
  track: Track;
  isActive?: boolean;
  isHovered?: boolean;
  onHoverChange?: (isHovered: boolean) => void;
  onClick?: (track: Track) => void;
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
    </TableRow>
  );
}
