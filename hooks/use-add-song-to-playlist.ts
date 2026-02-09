import { useState } from "react";
import { getApiHeaders, getApiUrl } from "@/lib/utils";

export function useAddSongToPlaylist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSongToPlaylist = async (playlistId: string, songId: number) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${getApiUrl()}/playlists/${playlistId}/songs`,
        {
          method: "PATCH",
          headers: getApiHeaders(),
          body: JSON.stringify({ songId }),
        },
      );

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur inconnue";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addSongToPlaylist, loading, error };
}
