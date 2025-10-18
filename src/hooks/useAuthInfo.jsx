import { use } from "react";
import { AuthContext } from "../context/authContext/AuthContext";

const useAuthInfo = () => {
  return use(AuthContext);
}; 
export default useAuthInfo;
 