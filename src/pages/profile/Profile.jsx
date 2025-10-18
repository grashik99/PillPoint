import { Link } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";

const Profile = () => {
  const { user, userType } = useAuthInfo();

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-80 shadow-xl items-center">
        <div className="bg-base-200 w-full rounded-t-xl flex justify-center py-4">
          <div className="avatar">
            <div className="w-48 rounded-full ring ring-white ring-offset-2">
              <img
                src={
                  user
                    ? user.photoURL
                    : "https://img.daisyui.com/images/profile/demo/distracted1@192.webp"
                }
              />
            </div>
          </div>
        </div>

        <div className="card-body items-center text-center">
          <h2 className="card-title text-lg font-bold">{user?.displayName}</h2>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <p className="text-sm text-gray-500">User Type: {userType}</p>

          <div className="card-actions mt-4">
            <Link to="/dashboard/settings" className="btn bg-blue-500 shadow border-none">
              Update
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
