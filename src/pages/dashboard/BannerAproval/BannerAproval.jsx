import axios from "axios";
import useAuthInfo from "../../../hooks/useAuthInfo";
import BannerAprovalCard from "./BannerAprovalCard";
import { Helmet } from "react-helmet";

const BannerAproval = () => {
  const { banners, refrash, setRefrash } = useAuthInfo();

  const handleApproval = async (bannerId) => {
    try {
      const res = await axios.patch(
        `https://pill-point-server-one.vercel.app/bannerReq/${bannerId}/approval`
      );
      if (res.data.success) {
        setRefrash(refrash + 1);
        // Optionally refresh state or update your frontend array
      }
    } catch (err) {
      console.error(err);
      alert("Failed to approval");
    }
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>PillPoint | Banner</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Discount</th>
              <th>Banner Status</th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((banner, index) => (
              <BannerAprovalCard
                key={banner._id}
                banner={banner}
                index={index}
                handleApproval={handleApproval}
              ></BannerAprovalCard>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BannerAproval;
