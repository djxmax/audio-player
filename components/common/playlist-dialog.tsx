"use client";

import { useState } from "react";
import { Playlist } from "@/data/playlists";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CoverUploader from "@/components/upload/cover-uploader";
import { useUpdatePlaylist } from "@/hooks/use-update-playlist";
import { useCreatePlaylist } from "@/hooks/use-create-playlist";
import { toast } from "sonner";
import { FormData } from "@/hooks/use-add-song";

interface PlaylistDialogProps {
  playlist?: Playlist;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (playlist: Playlist) => void;
}

export interface PlaylistFormData {
  name: string;
  description: string;
  coverUrl: string;
}

export default function PlaylistDialog({
  playlist,
  isOpen,
  onOpenChange,
  onSuccess,
}: PlaylistDialogProps) {
  const isEditMode = !!playlist;
  const [formData, setFormData] = useState<PlaylistFormData>({
    name: playlist?.name || "",
    description: playlist?.description || "",
    coverUrl: playlist?.coverUrl || "",
  });
  const { updatePlaylist, loading: isUpdating } = useUpdatePlaylist();
  const { createPlaylist, loading: isCreating } = useCreatePlaylist();

  const loading = isUpdating || isCreating;

  const updateField = (
    field: keyof FormData | keyof PlaylistFormData,
    value: any,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Le nom de la playlist est obligatoire");
      return;
    }

    try {
      let result;
      if (isEditMode) {
        result = await updatePlaylist(String(playlist?.id), {
          name: formData.name,
          description: formData.description,
          coverUrl: formData.coverUrl,
        });
        toast.success("Playlist mise à jour");
      } else {
        result = await createPlaylist({
          name: formData.name,
          description: formData.description,
          coverUrl: formData.coverUrl,
        });
        toast.success("Playlist créée");
      }

      onOpenChange(false);
      onSuccess?.(result);
    } catch (error) {
      const errorMessage = isEditMode ? "la mise à jour" : "la création";
      toast.error(`Erreur lors de ${errorMessage}`);
      console.error("Erreur:", error);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!loading) {
      if (!open) {
        setFormData({
          name: playlist?.name || "",
          description: playlist?.description || "",
          coverUrl: playlist?.coverUrl || "",
        });
      }
      onOpenChange(open);
    }
  };

  const isCreatingMode = !isEditMode;
  const title = isEditMode ? "Éditer la playlist" : "Nouvelle playlist";
  const description = isEditMode
    ? "Modifiez les détails de votre playlist"
    : "Créez une nouvelle playlist pour organiser votre musique";
  const submitButtonText = isEditMode
    ? loading
      ? "Mise à jour..."
      : "Enregistrer"
    : loading
      ? "Création..."
      : "Créer";

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nom *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Nom de la playlist"
              disabled={loading}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Description"
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label>Couverture</Label>
            <CoverUploader formData={formData} updateField={updateField} />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
