import { Outlet } from "react-router";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Helmet } from "react-helmet";

const HomeLayout = () => {
  return (
    <div>
      <Helmet>
        <title>PillPoint</title>
      </Helmet>
      <Navbar />
      <div className="min-h-[70vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default HomeLayout;
