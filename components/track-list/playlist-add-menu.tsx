import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Playlist } from "@/data/playlists";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAddSongToPlaylist } from "@/hooks/use-add-song-to-playlist";

interface PlaylistAddMenuProps {
  trackId: number;
  onAddToPlaylist?: (playlistId: string) => void;
  playlists: Playlist[];
}

export default function PlaylistAddMenu({
  trackId,
  onAddToPlaylist,
  playlists,
}: PlaylistAddMenuProps) {
  const { addSongToPlaylist, loading: isAdding } = useAddSongToPlaylist();

  const handleAddToPlaylist = async (playlistId: string) => {
    const playlist = playlists.find((p) => String(p.id) === playlistId);
    try {
      await addSongToPlaylist(playlistId, trackId);
      toast.success(`Ajouté à "${playlist?.name}"`);
      onAddToPlaylist?.(playlistId);
    } catch (error) {
      toast.error("Erreur lors de l'ajout à la playlist");
      console.error("Erreur lors de l'ajout à la playlist:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Plus size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-muted-foreground">
            Ajouter à la playlist
          </DropdownMenuLabel>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <DropdownMenuItem
                key={playlist.id}
                onClick={() => handleAddToPlaylist(String(playlist.id))}
                disabled={isAdding}
              >
                {playlist.name}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem disabled>Aucune playlist</DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
