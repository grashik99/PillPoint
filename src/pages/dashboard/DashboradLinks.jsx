import { NavLink } from "react-router";
import useAuthInfo from "../../hooks/useAuthInfo";

const DashboradLinks = () => {
  const { userType } = useAuthInfo();
  return (
    <>
      <NavLink to="/dashboard/profile" className="w-full btn justify-start">
        Profile
      </NavLink>
      <NavLink to="/dashboard/settings" className="w-full btn justify-start">
        Update Profile
      </NavLink>
      <NavLink to="/dashboard/cart" className="w-full btn justify-start">
        Cart
      </NavLink>
      <NavLink to="/dashboard/paymentHistory" className="w-full btn justify-start">
        My Payment History
      </NavLink>

      {userType === "Admin" && (
        <>
          <NavLink to="/dashboard/users" className="w-full btn justify-start">
            Users
          </NavLink>
          <NavLink to="/dashboard/overview" className="w-full btn justify-start">
            Overview
          </NavLink>
          <NavLink
            to="/dashboard/manageCategory"
            className="w-full btn justify-start"
          >
            Manage Category
          </NavLink>
          <NavLink to="/dashboard/company" className="w-full btn justify-start">
            Company
          </NavLink>
          <NavLink
            to="/dashboard/myMedicine"
            className="w-full btn justify-start"
          >
            My Medicine
          </NavLink>
          <NavLink
            to="/dashboard/payments"
            className="w-full btn justify-start"
          >
            All Payments
          </NavLink>
          <NavLink
            to="/dashboard/salesReport"
            className="w-full btn justify-start"
          >
            Sales Report
          </NavLink>
          <NavLink to="/dashboard/revenue" className="w-full btn justify-start">
            History
          </NavLink>
          <NavLink to="/dashboard/bannerAproval" className="w-full btn justify-start">
            Banner Aproval
          </NavLink>
        </>
      )}
      {userType === "Seller" && (
        <>
          <NavLink
            to="/dashboard/myMedicine"
            className="w-full btn justify-start"
          >
            My Medicine
          </NavLink>
          <NavLink to="/dashboard/company" className="w-full btn justify-start">
            Company
          </NavLink>
          <NavLink to="/dashboard/overview" className="w-full btn justify-start">
            Overview
          </NavLink>
          <NavLink to="/dashboard/revenue" className="w-full btn justify-start">
            Revenue
          </NavLink>
          <NavLink to="/dashboard/history" className="w-full btn justify-start">
            History
          </NavLink>
        </>
      )}
    </>
  );
};
export default DashboradLinks;
