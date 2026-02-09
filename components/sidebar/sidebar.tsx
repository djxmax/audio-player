"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { SidebarPlaylists } from "./sidebar-playlists";
import SidebarTop from "./siderbar-top";
import { useNavigationStore } from "@/store/navigation-store";

export function AppSidebar() {
  const { setLibrary, contentType } = useNavigationStore();

  return (
    <Sidebar>
      <SidebarTop />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ma musique</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={setLibrary}
              isActive={contentType === "library"}
              className="cursor-pointer"
            >
              Bibliothèque
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarPlaylists />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground">Audio Player v1.0</p>
      </SidebarFooter>
    </Sidebar>
  );
}
