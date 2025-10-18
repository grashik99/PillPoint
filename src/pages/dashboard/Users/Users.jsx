import { useEffect, useState } from "react";
import useAuthInfo from "../../../hooks/useAuthInfo";
import UsersCard from "./UsersCard";
import { Helmet } from "react-helmet";

const Users = () => {
  const [users, setUsers] = useState(null);

  const { userType, user } = useAuthInfo();
  useEffect(() => {
    fetch(`https://pill-point-server-one.vercel.app/users?email=${user?.email}`, {
      headers: {
        Authorization: `Bearer ${user?.accessToken}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [user, userType]);

  return (
    <div className="overflow-x-auto">
      <Helmet>
        <title>PillPoint | Users</title>
      </Helmet>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {users &&
            users.map((user) => <UsersCard key={user._id} user={user} />)}
        </tbody>
      </table>
    </div>
  );
};
export default Users;
