"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { useSearchTracks } from "@/hooks/use-search-tracks";
import { useNavigationStore } from "@/store/navigation-store";
import { useSearchStore } from "@/store/search-store";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { X } from "lucide-react";

export default function Search() {
  const [query, setQuery] = useState("");
  const { search } = useSearchTracks();
  const { contentType, setLibrary } = useNavigationStore();
  const { setQuery: setSearchQuery, setResults } = useSearchStore();

  const handleSearch = useCallback(
    async (searchQuery: string) => {
      setQuery(searchQuery);
      setSearchQuery(searchQuery);

      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      // Si on n'est pas sur la page library, y aller
      if (contentType !== "library") {
        setLibrary();
      }

      // Effectuer la recherche
      const results = await search(searchQuery);
      setResults(results || []);
    },
    [search, contentType, setLibrary, setSearchQuery, setResults],
  );

  const handleClear = useCallback(() => {
    setQuery("");
    setSearchQuery("");
    setResults([]);
  }, [setSearchQuery, setResults]);

  return (
    <InputGroup>
      <InputGroupInput
        placeholder="Rechercher..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton variant="secondary" onClick={handleClear}>
          <X />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  );
}
