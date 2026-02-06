"use client";

import { CheckCircle2, Music } from "lucide-react";
import { UploadButton } from "@/lib/updloadthing";
import { FormData } from "@/hooks/use-add-song";

interface MusicUploaderProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}

export default function MusicUploader({
  formData,
  updateField,
}: MusicUploaderProps) {
  const getAudioDuration = (url: string): Promise<number> => {
    return new Promise((resolve) => {
      const audio = new Audio();
      audio.src = url;
      audio.onloadedmetadata = () => {
        resolve(Math.round(audio.duration));
      };
    });
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-secondary/20">
      <div className="flex items-center gap-3">
        {formData.url ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Music className="h-5 w-5 text-muted-foreground" />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">Fichier Audio</span>
          <span className="text-xs text-muted-foreground">
            {formData.url ? "Fichier prêt" : "En attente d'upload..."}
          </span>
        </div>
      </div>

      <UploadButton
        endpoint="audioUploader"
        onClientUploadComplete={async (res) => {
          if (res) {
            const url = res[0].ufsUrl;
            const duration = await getAudioDuration(url);
            updateField("url", url);
            updateField("duration", duration);
          }
        }}
        // On customise l'apparence pour que ça ressemble à un lien/petit bouton
        appearance={{
          button:
            "ut-ready:bg-primary/10 ut-ready:text-primary text-xs h-8 px-4 border-none shadow-none hover:bg-primary/20 transition-colors",
          allowedContent: "hidden", // Masque le texte "Audio (8MB)" en dessous
        }}
        content={{
          button({ ready, isUploading }) {
            if (isUploading) return "Chargement...";
            if (formData.url) return "Modifier";
            return "Choisir le MP3";
          },
        }}
      />
    </div>
  );
}
