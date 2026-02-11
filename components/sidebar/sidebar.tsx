"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";
import { SidebarPlaylists } from "./sidebar-playlists";
import SidebarTop from "./siderbar-top";
import { useNavigationStore } from "@/store/navigation-store";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar() {
  const { setLibrary, contentType } = useNavigationStore();
  const { toggleSidebar } = useSidebar();
  const isMobile = useIsMobile();

  const handleMenuItemClick = () => {
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <Sidebar>
      <SidebarTop />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Ma musique</SidebarGroupLabel>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                setLibrary();
                handleMenuItemClick();
              }}
              isActive={contentType === "library"}
              className="cursor-pointer"
            >
              Bibliothèque
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarPlaylists onItemClick={handleMenuItemClick} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <p className="text-xs text-muted-foreground">Audio Player v1.0</p>
      </SidebarFooter>
    </Sidebar>
  );
}
