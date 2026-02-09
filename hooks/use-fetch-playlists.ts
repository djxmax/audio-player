import { useState, useEffect, useCallback } from "react";
import { Playlist } from "@/data/playlists";
import { getApiHeaders, getApiUrl } from "@/lib/utils";
import { useNavigationStore } from "@/store/navigation-store";

export function useFetchPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const playlistsRefreshKey = useNavigationStore(
    (state) => state.playlistsRefreshKey,
  );

  const fetchPlaylists = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(`${getApiUrl()}/playlists`, {
        headers: getApiHeaders(),
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
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists, playlistsRefreshKey]);

  return { playlists, loading, error, refetch: fetchPlaylists };
}
