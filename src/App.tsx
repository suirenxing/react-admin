import { useEffect, useRef, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { getMenus } from "./api/sys";
import { Spin } from "antd";
import { addIconToMenu } from "./hooks/menus";
import setRoutes from "@/router";
import { permissionStore } from "./store/module/permission";
import { transformRoute } from "@/router/useRouteHelp";
import { cloneDeep } from "lodash-es";
function App() {
  const [loading, setLoading] = useState(true);
  const setMenus = permissionStore((state) => state.setMenus);
  const router = useRef<ReturnType<typeof setRoutes>>();
  useEffect(() => {
    let ignore = false;
    getMenus().then((result) => {
      if (!ignore) {
        setMenus(addIconToMenu(cloneDeep(result)));
        const dynamicRoutes = transformRoute(cloneDeep(result));
        router.current = setRoutes(dynamicRoutes);
        setLoading(false);
      }
    });
    return () => {
      ignore = true;
    };
  });

  return (
    <>
      {loading ? (
        <div className="w-full h-100vh flex justify-center items-center">
          <Spin size="large" />
        </div>
      ) : (
        <RouterProvider router={router.current!} />
      )}
    </>
  );
}

export default App;
