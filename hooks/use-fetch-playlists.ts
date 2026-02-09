import { useState, useEffect } from "react";
import { Playlist } from "@/data/playlists";

export function useFetchPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

        if (!apiUrl || !apiKey) {
          alert("Configuration manquante !");
          return;
        }

        const response = await fetch(apiUrl + "/playlists", {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        });
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setPlaylists(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setPlaylists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylists();
  }, []);

  return { playlists, loading, error };
}
