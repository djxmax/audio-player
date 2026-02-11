import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild></DrawerTrigger>
      <DrawerContent></DrawerContent>
    </Drawer>
  );
}
