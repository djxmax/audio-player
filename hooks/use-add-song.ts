import { useState } from "react";
import { useRouter } from "next/navigation";
import { getApiHeaders, getApiUrl } from "@/lib/utils";
import { useNavigationStore } from "@/store/navigation-store";

export interface FormData {
  title: string;
  artist: string;
  album: string;
  url: string;
  coverUrl: string;
  duration: number;
}

export function useAddSong() {
  const router = useRouter();
  const { invalidateTracks } = useNavigationStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    artist: "",
    album: "",
    url: "",
    coverUrl: "",
    duration: 0,
  });

  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (onSuccess?: () => void) => {
    if (!formData.url || !formData.coverUrl) {
      alert("Fichiers manquants !");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${getApiUrl()}/songs`, {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: "",
          artist: "",
          album: "",
          url: "",
          coverUrl: "",
          duration: 0,
        });
        invalidateTracks();
        router.refresh();
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error("Erreur save:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    updateField,
    handleSave,
  };
}
