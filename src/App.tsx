import router from "@/router";
import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { getMenus } from "./api/sys";
import userStore from "./store/module/userStore";
import { Spin } from "antd";
import { addIconToMenu } from "./hooks/menus";
function App() {
  const [loading, setLoading] = useState(true);
  const setMenus = userStore((state) => state.setMenus);
  useEffect(() => {
    getMenus().then((result) => {
      setMenus(addIconToMenu(result));
      setLoading(false);
    });
  });
  return (
    <>
      {loading ? (
        <div className="w-full h-100vh flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
}

export default App;
