"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/hooks/use-add-song";

interface TrackFormProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}

export default function TrackForm({ formData, updateField }: TrackFormProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Titre</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Ex: Neverender"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="artist">Artiste</Label>
        <Input
          id="artist"
          value={formData.artist}
          onChange={(e) => updateField("artist", e.target.value)}
          placeholder="Ex: Justice"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="album">Album</Label>
        <Input
          id="album"
          value={formData.album}
          onChange={(e) => updateField("album", e.target.value)}
          placeholder="Ex: Hyperdrama"
        />
      </div>
    </div>
  );
}
