"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle, Loader2 } from "lucide-react";
import MusicUploader from "./music-uploader";
import CoverUploader from "./cover-uploader";
import TrackForm from "./track-form";
import { useAddSong } from "@/hooks/use-add-song";

export function AddSongDialog() {
  const [open, setOpen] = useState(false);
  const { formData, loading, updateField, handleSave } = useAddSong();

  const handleUpdateField = (field: string, value: any) => {
    updateField(field as keyof typeof formData, value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Ajouter une musique
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nouvelle Musique</DialogTitle>
          <DialogDescription>
            Remplissez les détails et uploadez vos fichiers.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <TrackForm formData={formData} updateField={updateField} />
          <div className="flex flex-col gap-4 mt-2">
            <MusicUploader formData={formData} updateField={updateField} />

            <CoverUploader
              formData={formData}
              updateField={handleUpdateField}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={() => handleSave(() => setOpen(false))}
            disabled={loading || !formData.url || !formData.coverUrl}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enregistrer la musique
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
