"use client";

import { CheckCircle2, ImageIcon } from "lucide-react";
import { UploadButton } from "@/lib/updloadthing";
import { FormData } from "@/hooks/use-add-song";

interface CoverUploaderProps {
  formData: FormData;
  updateField: (field: keyof FormData, value: any) => void;
}

export default function CoverUploader({
  formData,
  updateField,
}: CoverUploaderProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-secondary/20">
      <div className="flex items-center gap-3">
        {formData.coverUrl ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
        )}
        <div className="flex flex-col">
          <span className="text-sm font-medium">Couverture</span>
          <span className="text-xs text-muted-foreground">
            {formData.coverUrl ? "Image prête" : "En attente d'upload..."}
          </span>
        </div>
      </div>

      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          if (res) updateField("coverUrl", res[0].ufsUrl);
        }}
        appearance={{
          button:
            "ut-ready:bg-primary/10 ut-ready:text-primary text-xs h-8 px-4 border-none shadow-none hover:bg-primary/20 transition-colors",
          allowedContent: "hidden",
        }}
        content={{
          button({ isUploading }) {
            if (isUploading) return "Chargement...";
            if (formData.coverUrl) return "Modifier";
            return "Choisir l'image";
          },
        }}
      />
    </div>
  );
}
