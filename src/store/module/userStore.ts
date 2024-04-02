import { create } from "zustand";
import type { Menu } from "@/api/sys";
type UserState = {
  user: any;
  menus: Menu[];
};
type UserAction = {
  setMenus: (menus: Menu[]) => void;
};
const userStore = create<UserState & UserAction>((set) => ({
  user: null,
  menus: [],
  setMenus: (menus) => set(() => ({ menus })),
}));
export default userStore;
