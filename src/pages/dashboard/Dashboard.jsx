import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Logo from "../../components/shared/logo";
import DashboradLinks from "./DashboradLinks";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const dashboard = true;
  return (
    <div>
      <Helmet>
        <title>PillPoint | Dashboard</title>
      </Helmet>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar dashboard={dashboard} />
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li>
              <Logo />
            </li>
            {<DashboradLinks />}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
