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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarTop />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ma musique</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#library">Bibliothèque</a>
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
