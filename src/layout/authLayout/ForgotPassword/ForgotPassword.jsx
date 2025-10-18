import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    // console.log(email);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Successfully sent mail reset.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <div className="card bg-base-200 w-auto md:min-w-xs shrink-0 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleForgotPassword} className="fieldset">
          <label className="label">Type Your Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            name="email"
          />
          <button type="submit" className="btn btn-neutral mt-4">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
