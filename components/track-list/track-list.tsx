import { Track } from "@/data/songs";
import { useState } from "react";
import { useFetchTracks } from "@/hooks/use-fetch-tracks";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TrackItem from "./track-item";

interface TrackListProps {
  onSelect: (track: Track) => void;
  activeTrackId: number | undefined;
}

export default function TrackList({ onSelect, activeTrackId }: TrackListProps) {
  const [hoveredTrackId, setHoveredTrackId] = useState<number | undefined>();
  const { tracks, loading, error } = useFetchTracks();

  if (loading) return <div>Chargement...</div>;
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
          {tracks.map((track) => (
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
