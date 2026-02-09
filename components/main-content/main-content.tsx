"use client";

import { useNavigationStore } from "@/store/navigation-store";
import LibraryContent from "./library-content";
import PlaylistContent from "./playlist-content";

export default function MainContent() {
  const { contentType, selectedPlaylistId } = useNavigationStore();

  return (
    <div className="w-full">
      {contentType === "library" && <LibraryContent />}
      {contentType === "playlist" && selectedPlaylistId && (
        <PlaylistContent playlistId={selectedPlaylistId} />
      )}
    </div>
  );
}
