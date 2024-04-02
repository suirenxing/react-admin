import { Menu } from "@/api/sys";
import { create } from "zustand";

type PermissionState = {
  munus: Menu[];
};
interface PermissionAction {
  setMenus: (menus: Menu[]) => void;
}
export const usePermissionStore = create<PermissionState & PermissionAction>(
  (set) => ({
    munus: [],
    setMenus: (menus) => set(() => ({ munus: menus })),
  })
);
