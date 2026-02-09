"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "./theme-toggle";
import Search from "./search";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { AddSongDialog } from "../upload/add-song-dialog";
import { useSidebar } from "@/components/ui/sidebar";

export default function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <Card className="w-full mx-auto overflow-hidden">
      <CardContent className="px-6">
        <div className="flex felx-row items-center gap-4">
          <div className="flex-1/4">
            <Button variant="outline" size="icon" onClick={toggleSidebar}>
              <PanelLeft />
            </Button>
          </div>
          <div className="flex-1/2">
            <Search />
          </div>
          <div className="flex-1/4 flex flex-row items-center justify-end gap-4 h-full">
            <AddSongDialog />
            <ThemeToggle />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
