
import { Track } from "@/data/songs";

interface TrackListProps {
    tracks: Track[];
    onSelect: (track: Track) => void;
    activeTrackId: number | undefined
}

export default function TrackList({tracks, onSelect, activeTrackId}: TrackListProps) {
    
    return (<div></div>)
}