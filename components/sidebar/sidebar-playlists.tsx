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
import { ChevronRightIcon } from "lucide-react";
import { useFetchPlaylists } from "@/hooks/use-fetch-playlists";

export function SidebarPlaylists() {
  const { playlists, loading } = useFetchPlaylists();
  const [isOpen, setIsOpen] = useState(false);

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
                    <SidebarMenuSubButton asChild>
                      <a href={`#playlist-${playlist.id}`}>{playlist.name}</a>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))
              ) : (
                <SidebarMenuSubItem>
                  <div>Aucune playlist</div>
                </SidebarMenuSubItem>
              )}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}
