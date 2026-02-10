import { Music } from "lucide-react";
import { SidebarHeader } from "@/components/ui/sidebar";

export default function SidebarTop() {
  return (
    <SidebarHeader>
      <div className="flex items-center justify-center gap-2 p-4 w-full">
        <img src="/logo.png" alt="Logo" className="w-42 h-42 rounded-2xl" />
      </div>
    </SidebarHeader>
  );
}
