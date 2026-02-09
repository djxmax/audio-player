import { useState, useEffect } from "react";
import { Track } from "@/data/songs";
import { getApiHeaders, getApiUrl } from "@/lib/utils";
import { get } from "http";

export function useFetchTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${getApiUrl()}/songs`, {
          headers: getApiHeaders(),
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
