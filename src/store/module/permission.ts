import { Menu } from "@/api/sys";
import { create } from "zustand";

type PermissionState = {
  menus: Menu[];
};
interface PermissionAction {
  setMenus: (menus: Menu[]) => void;
}
export const permissionStore = create<PermissionState & PermissionAction>(
  (set) => ({
    menus: [],
    setMenus: (menus) => set(() => ({ menus: menus })),
  })
);
