import { useState } from "react";
import { getApiHeaders, getApiUrl } from "@/lib/utils";

export interface PlaylistUpdateData {
  name: string;
  description: string;
  coverUrl: string;
}

export function useUpdatePlaylist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePlaylist = async (
    playlistId: string,
    data: PlaylistUpdateData,
  ) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${getApiUrl()}/playlists/${playlistId}`, {
        method: "PATCH",
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

  return { updatePlaylist, loading, error };
}
