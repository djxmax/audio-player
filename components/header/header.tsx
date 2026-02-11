"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "./theme-toggle";
import Search from "./search";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";
import { AddSongDialog } from "../upload/add-song-dialog";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <Card className={cn("w-full mx-auto overflow-hidden p-0", className)}>
      <CardContent className="p-2 md:p-6">
        <div className="flex flex-row items-center gap-4">
          <div className="flex-auto md:flex-1/4">
            <Button variant="outline" size="icon" onClick={toggleSidebar}>
              <PanelLeft />
            </Button>
          </div>
          <div className="flex-auto md:flex-1/2">
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
