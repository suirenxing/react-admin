import { PageEnum } from "@/enums/pageEnum";
import userStore from "@/store/module/userStore";
import { Navigate, useLocation } from "react-router-dom";

const AuthRouter = () => {
  const token = userStore((state) => state.token);
  const location = useLocation();
  if (location.pathname === PageEnum.BASE_LOGIN && token) {
    return <Navigate to={PageEnum.BASE_HOME}></Navigate>;
  }
  return <></>;
};
