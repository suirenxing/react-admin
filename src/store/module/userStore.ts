import { create } from "zustand";
type UserState = {
  user: any;
  token?: string;
};
type UserAction = {
  setToken: (token: string) => void;
};
const userStore = create<UserState & UserAction>((set) => ({
  user: null,
  token: "",
  setToken: (token: string) => set((state) => ({ ...state, token })),
}));
export default userStore;
