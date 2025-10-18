import Banner from "../banner/Banner";
import CategoryCard from "../categoryCard/CategoryCard";
import DeliveryService from "../DeliveryService/DeliveryService";
import DiscountProducts from "../DiscountProducts/DiscountProducts";
import MedicineInquiry from "../MedicineInquiry/MedicineInquiry";

const Home = () => {
  return (
    <div>
      <Banner />
      <CategoryCard />
      <MedicineInquiry />
      <DiscountProducts />
      <DeliveryService/>
    </div>
  );
};
export default Home;
