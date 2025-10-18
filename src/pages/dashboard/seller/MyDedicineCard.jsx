const MyDedicineCard = ({
  index,
  myMedicine,
  handleUpdateMedicine,
  addToBanner,
}) => {
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{myMedicine.itemName}</td>
        <td>{myMedicine.quantity}</td>
        <td className="p-0">
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleUpdateMedicine(myMedicine)}
              className="btn btn-sm btn-info shadow"
            >
              Update Info
            </button>
            <button className="btn btn-sm btn-warning shadow">Delete</button>
            <button
              onClick={() => addToBanner(myMedicine)}
              className="btn btn-sm btn-success shadow"
            >
              Add For Ad
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};
export default MyDedicineCard;
