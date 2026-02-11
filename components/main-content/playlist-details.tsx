import { useState } from "react";
import { Playlist } from "@/data/playlists";
import { Edit, Trash2 } from "lucide-react";
import Cover from "../common/cover";
import PlaylistDialog from "../common/playlist-dialog";
import { Button } from "@/components/ui/button";
import { useDeletePlaylist } from "@/hooks/use-delete-playlist";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PlaylistDetailsProps {
  playlist: Playlist;
  onEdit?: () => void;
  onDelete?: () => void;
  onPlaylistUpdate?: (playlist: Playlist) => void;
}

export default function PlaylistDetails({
  playlist,
  onEdit,
  onDelete,
  onPlaylistUpdate,
}: PlaylistDetailsProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { deletePlaylist, loading: isDeleting } = useDeletePlaylist();

  const handleDeleteConfirm = async () => {
    try {
      await deletePlaylist(String(playlist.id));
      toast.success("Playlist supprimée");
      setIsDeleteDialogOpen(false);
      onDelete?.();
    } catch (error) {
      toast.error("Erreur lors de la suppression");
      console.error("Erreur lors de la suppression:", error);
    }
  };
  return (
    <div className="w-full flex gap-2 md:gap-6 mb-2 md:mb-8 p-2 md:p-0 items-start">
      <div className="flex-shrink-0">
        <Cover playlist={playlist} className="w-24 h-24 md:w-48 md:h-48" />
      </div>
      <div className="flex-1 min-w-0">
        <h1 className="text-4xl font-bold mb-2 break-words">{playlist.name}</h1>
        <p className="text-muted-foreground mb-4 break-words">
          {playlist.description}
        </p>
        <p className="text-sm text-muted-foreground mb-4">
          {playlist.songs?.length || 0} chansons
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditDialogOpen(true)}
            className="gap-2"
          >
            <Edit size={16} />
            Éditer
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="gap-2 hover:text-destructive"
          >
            <Trash2 size={16} />
            Supprimer
          </Button>
        </div>
      </div>

      <PlaylistDialog
        playlist={playlist}
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSuccess={(updatedPlaylist) => {
          onPlaylistUpdate?.(updatedPlaylist);
        }}
      />

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la playlist</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer "{playlist.name}" ? Cette
              action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
