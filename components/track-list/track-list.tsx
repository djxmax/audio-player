import { Track } from "@/data/songs";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import TrackItem from "./track-item";

interface TrackListProps {
  tracks: Track[];
  onSelect: (track: Track) => void;
  activeTrackId: number | undefined;
  loading?: boolean;
  error?: string | null;
}

export default function TrackList({
  tracks,
  onSelect,
  activeTrackId,
  loading = false,
  error = null,
}: TrackListProps) {
  const [hoveredTrackId, setHoveredTrackId] = useState<number | undefined>();

  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead>Durée</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {loading ? 
          Array.from({ length: 8 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-12" />
                </TableCell>
              </TableRow>
            ))
          :tracks.map((track) => (
            <TrackItem
              key={track.id}
              track={track}
              isActive={activeTrackId === track.id}
              isHovered={hoveredTrackId === track.id}
              onClick={() => onSelect(track)}
              onHoverChange={(isHovered) =>
                setHoveredTrackId(isHovered ? track.id : undefined)
              }
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
