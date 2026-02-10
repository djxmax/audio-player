import { useState, useCallback } from "react";
import { Track } from "@/data/songs";
import { getApiHeaders, getApiUrl } from "@/lib/utils";

export function useSearchTracks() {
  const [results, setResults] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setError(null);
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${getApiUrl()}/songs/search?q=${encodeURIComponent(query)}`,
        {
          headers: getApiHeaders(),
        },
      );

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
      return data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erreur inconnue";
      setError(errorMessage);
      setResults([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  return { results, loading, error, search, clearResults };
}
