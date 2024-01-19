import { createContext } from "react";

type AppContext = {
  primary: string;
};
export const AppContext = createContext<AppContext>({
  primary: "#1677ff",
});
