import Lottie from "lottie-react";
import lottie404 from "../../assets/lottieJson/404.json";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="max-w-92 min-h-screen mx-auto flex items-center hover:text-black">
      <Link to="/">
        <Lottie animationData={lottie404} loop={true} />
      </Link>
    </div>
  );
};
export default Error;
