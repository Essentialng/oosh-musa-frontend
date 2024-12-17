// --------- version 2 --------
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/slice/auth.slice";

const useLogout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fullPath = location.pathname + location.search;
  const dispatch = useDispatch()


  const logout = async () => {
    try {
      localStorage.removeItem("access_token");
      dispatch(logoutUser())
      navigate("/login?from="+fullPath);
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
