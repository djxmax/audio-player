import { useState } from "react";
import { getApiHeaders, getApiUrl } from "@/lib/utils";
import { get } from "http";

export function useDeletePlaylist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deletePlaylist = async (playlistId: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${getApiUrl()}/playlists/${playlistId}`, {
        method: "DELETE",
        headers: getApiHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      return true;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur inconnue";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deletePlaylist, loading, error };
}
