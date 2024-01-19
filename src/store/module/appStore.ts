import { create } from "zustand";
type AppState = {
  primary: string;
  sideWidth: number | string;
};
type AppAction = {
  setPrimary: (color: string) => void;
};
const useAppStore = create<AppState & AppAction>((set) => ({
  primary: "#1677ff",
  sideWidth: 210,
  setPrimary: (color) => set(() => ({ primary: color })),
}));
export default useAppStore;
