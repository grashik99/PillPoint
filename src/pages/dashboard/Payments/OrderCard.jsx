const OrderCard = ({ order, index, handlePayment }) => {
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>{order.transactionId}</td>
        <td>{order.amount}</td>
        <td>
          {order.status ? (
            <span className="btn-sm btn" disabled>
              Paid
            </span>
          ) : (
            <button
              onClick={() => handlePayment(order._id)}
              className="btn-sm btn bg-blue-500"
            >
              Accept Pay
            </button>
          )}
        </td>
      </tr>
    </>
  );
};
export default OrderCard;
