import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Lottie from "lottie-react";
import welcomeLottie from "../../assets/lottieJson/Welcome.json"

const AuthLayout = () => {
  return (
    <div>
      <Navbar/>
      <div className="hero bg-base-100 min-h-screen">
        <div className="hero-content grid md:grid-cols-2 gap-10">
          <div className="text-center lg:text-left">
            <Lottie animationData={welcomeLottie}/>
          </div>
          <div className="w-auto mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
