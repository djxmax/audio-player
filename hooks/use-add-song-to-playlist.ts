import { useState } from "react";

export function useAddSongToPlaylist() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addSongToPlaylist = async (playlistId: string, songId: number) => {
    try {
      setLoading(true);
      setError(null);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

      if (!apiUrl || !apiKey) {
        throw new Error("Configuration manquante !");
      }

      const response = await fetch(`${apiUrl}/playlists/${playlistId}/songs`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({ songId }),
      });

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
