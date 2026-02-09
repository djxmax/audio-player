import { useState, useEffect } from "react";
import { Track } from "@/data/songs";

export function useFetchTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY ?? "";

    if(!apiUrl || !apiKey) {
    alert("Configuration manquante !")
    return
    }

        const response = await fetch(apiUrl + "/songs", {
            headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey
        },
        });
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setTracks(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setTracks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTracks();
  }, []);

  return { tracks, loading, error };
}
