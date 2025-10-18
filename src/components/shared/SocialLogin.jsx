import axios from "axios";
import useAuthInfo from "../../hooks/useAuthInfo";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { logInWithGoogle } = useAuthInfo();
  const now = new Date().toString();

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleLogin = () => {
    logInWithGoogle()
      .then((result) => {
        const data = result.user;

        const newUser = {
          username: data.displayName,
          email: data.email,
          userType: "Customer",
          profilePicture: data.photoURL,
          creationTime: now,
          cart: [],
        };
        if (result.user.uid) {
          axios
            .post("https://pill-point-server-one.vercel.app/users", newUser)
            .then(function (response) {
              if (response.status === 200) {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Login successful.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(from, { replace: true });
              }
            })
        }

        // ...
      })
      
  };

  return (
    <div className="border-t-2 pt-4 mx-6">
      <div className="text-center mb-6">
        <button onClick={handleGoogleLogin} className="btn border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};
export default SocialLogin;
