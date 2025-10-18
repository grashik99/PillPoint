const BannerAprovalCard = ({ banner, index, handleApproval }) => {
  // console.log(banner);
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{banner.itemName}</td>
        <td>{banner.discount} %</td>
        <td>
          {banner?.approval ? (
            <button
              onClick={() => handleApproval(banner.bannerId)}
              className="btn btn-sm bg-green-500 shadow"
            >
              On Air
            </button>
          ) : (
            <button
              onClick={() => handleApproval(banner.bannerId)}
              className="btn btn-sm shadow bg-red-500"
            >
              Need to Approve
            </button>
          )}
        </td>
      </tr>
    </>
  );
};
export default BannerAprovalCard;
