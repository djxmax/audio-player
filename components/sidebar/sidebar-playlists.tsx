"use client";

import { useState } from "react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRightIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFetchPlaylists } from "@/hooks/use-fetch-playlists";
import { useNavigationStore } from "@/store/navigation-store";
import PlaylistDialog from "@/components/common/playlist-dialog";
import Cover from "@/components/common/cover";

export function SidebarPlaylists({
  onItemClick,
}: {
  onItemClick?: () => void;
}) {
  const { playlists, loading } = useFetchPlaylists();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { setSelectedPlaylist, selectedPlaylistId, invalidatePlaylists } =
    useNavigationStore();

  return (
    <SidebarMenu>
      <Collapsible
        asChild
        defaultOpen={false}
        className="group/collapsible"
        onOpenChange={setIsOpen}
      >
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Playlists" asChild>
            <CollapsibleTrigger>
              <span>Playlists</span>
              <ChevronRightIcon
                className={`ml-auto transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </CollapsibleTrigger>
          </SidebarMenuButton>
          <CollapsibleContent>
            <SidebarMenuSub>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuSkeleton />
                  </SidebarMenuItem>
                ))
              ) : playlists.length > 0 ? (
                playlists.map((playlist) => (
                  <SidebarMenuSubItem key={playlist.id}>
                    <SidebarMenuSubButton
                      onClick={() => {
                        setSelectedPlaylist(playlist.id);
                        onItemClick?.();
                      }}
                      isActive={selectedPlaylistId === playlist.id}
                      className="cursor-pointer"
                    >
                      <Cover playlist={playlist} className="w-6 h-6" />
                      <span className="truncate">{playlist.name}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))
              ) : (
                <SidebarMenuSubItem>
                  <div>Aucune playlist</div>
                </SidebarMenuSubItem>
              )}
              <SidebarMenuSubItem>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="w-full justify-start gap-2 h-8"
                >
                  <Plus size={16} />
                  Nouvelle playlist
                </Button>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>

      <PlaylistDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={() => {
          invalidatePlaylists();
          setIsCreateDialogOpen(false);
        }}
      />
    </SidebarMenu>
  );
}
