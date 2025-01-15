import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "./useContexts";
import { IAppContext } from "../context/AppContext";

const useLogout = () => {
  const store = useStore() as IAppContext;
  const setUserInfo = store?.setUserInfo;
  const navigate = useNavigate();
  const location = useLocation();
  const fullPath = location.pathname + location.search;

  const logout = async (shouldReturn?: boolean) => {
    try {
      localStorage.removeItem("_dl_token");
      setUserInfo({});
      navigate(shouldReturn ? "/login?from=" + fullPath : "/login");
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
