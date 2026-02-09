import { useState } from "react";
import { getApiHeaders, getApiUrl } from "@/lib/utils";

export interface PlaylistCreateData {
  name: string;
  description: string;
  coverUrl: string;
}

export function useCreatePlaylist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPlaylist = async (data: PlaylistCreateData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${getApiUrl()}/playlists`, {
        method: "POST",
        headers: getApiHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur inconnue";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createPlaylist, loading, error };
}
