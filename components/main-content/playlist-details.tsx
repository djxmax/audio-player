import { Playlist } from "@/data/playlists";
import { Edit, Trash2 } from "lucide-react";
import Cover from "../common/cover";
import { Button } from "@/components/ui/button";

interface PlaylistDetailsProps {
  playlist: Playlist;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function PlaylistDetails({
  playlist,
  onEdit,
  onDelete,
}: PlaylistDetailsProps) {
  return (
    <div className="flex gap-6 mb-8 items-start">
      <div className="flex-shrink-0">
        <Cover playlist={playlist} size={48} />
      </div>
      <div className="flex-1">
        <h1 className="text-4xl font-bold mb-2">{playlist.name}</h1>
        <p className="text-muted-foreground mb-4">{playlist.description}</p>
        <p className="text-sm text-muted-foreground mb-4">
          {playlist.songs?.length || 0} chansons
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="gap-2"
          >
            <Edit size={16} />
            Éditer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDelete}
            className="gap-2 hover:text-destructive"
          >
            <Trash2 size={16} />
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
}
