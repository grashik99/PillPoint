import { FaCartPlus } from "react-icons/fa";
import { TiInfoLargeOutline } from "react-icons/ti";

const CategoryMedicineCard = ({ medicine, onShowInfo, setCartMedicine }) => {
  return (
    <tr>
      <td>{medicine?.itemName}</td>
      <td>{medicine?.perUnitPrice} ৳ </td>
      <td>{medicine?.quantity}</td>
      <td className="flex gap-1">
        <button
          onClick={() => {
            onShowInfo(medicine);
            document.getElementById("medicine_modal").showModal();
          }}
          className="btn shadow"
        >
          <TiInfoLargeOutline />
        </button>
        <button
          onClick={() => {
            document.getElementById("my_modal_3").showModal();
            setCartMedicine(medicine);
          }}
          className="btn shadow"
        >
          <FaCartPlus />
        </button>
      </td>
    </tr>
  );
};

export default CategoryMedicineCard;
