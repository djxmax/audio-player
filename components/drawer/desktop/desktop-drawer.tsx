"use client";

import Cover from "@/components/common/cover";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { usePlayerTrack } from "@/store/player-store";
import { useDrawerActions } from "@/store/drawer-store";
import { PanelRightClose } from "lucide-react";

export default function DesktopDrawer() {
  const track = usePlayerTrack();
  const { closeDesktopDrawer } = useDrawerActions();

  return (
    <Card className="w-80 mx-auto h-full overflow-hidden">
      <CardContent className="h-full w-full">
        <div className="h-full w-full flex flex-col">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={closeDesktopDrawer}>
              <PanelRightClose />
            </Button>
            <h2 className="text-2xl font-bold mb-4">Lecture en cours</h2>
          </div>

          <div className="flex-1 flex flex-col gap-4 items-center justify-center min-h-0">
            <div className="flex items-center justify-center">
              <Cover track={track} className="w-64 h-64" />
            </div>
            <div className="flex flex-col gap-2 justify-center items-center text-center">
              <h3 className="font-bold text-xl truncate">
                {track?.title ?? ""}
              </h3>
              <p className="text-sm text-muted-foreground">
                {track?.artist ?? ""}
              </p>
              {track?.album && (
                <p className="text-sm text-muted-foreground">{track?.album}</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
