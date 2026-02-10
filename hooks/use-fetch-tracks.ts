import { useState, useEffect, useCallback } from "react";
import { Track } from "@/data/songs";
import { getApiHeaders, getApiUrl } from "@/lib/utils";
import { useNavigationStore } from "@/store/navigation-store";

export function useFetchTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tracksRefreshKey = useNavigationStore(
    (state) => state.tracksRefreshKey,
  );

  const fetchTracks = useCallback(async () => {
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
  }, []);

  useEffect(() => {
    fetchTracks();
  }, [fetchTracks, tracksRefreshKey]);

  return { tracks, loading, error };
}
