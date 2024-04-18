import { RouterProvider } from "react-router-dom";
import { Spin } from "antd";
import useMenu from "./hooks/menus";
function App() {
  const { loading, router } = useMenu();
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
