import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "./theme-toggle";
import Search from "./search";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

export default function Header() {
  return (
    <Card className="w-full mx-auto overflow-hidden">
      <CardContent className="px-6">
        <div className="flex felx-row items-center gap-4">
          <div className="flex-1/4">
            <Button variant="outline" size="icon">
              <PanelLeft />
            </Button>
          </div>
          <div className="flex-1/2">
            <Search />
          </div>
          <div className="flex-1/4 flex flex-row items-center justify-end gap-4 h-full">
            <ThemeToggle />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
