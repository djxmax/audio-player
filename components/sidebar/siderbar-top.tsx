import { Music } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";

export default function SidebarTop() {
  return (
    <SidebarHeader>
      <div className="flex items-center gap-2">
        <Music className="w-6 h-6" />
        <h1 className="font-bold text-lg">Music Player</h1>
      </div>
    </SidebarHeader>
  );
}
