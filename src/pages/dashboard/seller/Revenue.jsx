import { Helmet } from "react-helmet";
import useAuthInfo from "../../../hooks/useAuthInfo";

const Revenue = () => {
  const { orders, myMedicines } = useAuthInfo();

  // Get array of your medicine IDs
  const myMedicineIds = myMedicines?.map(med => med._id);

  // Filter orders that include at least one of your medicines
  const myOrders = orders?.filter(order =>
    order.items?.some(item => myMedicineIds.includes(item._id))
  );

  // Separate paid and pending orders
  const paidOrders = myOrders.filter(order => order.status === true);
  const pendingOrders = myOrders.filter(order => order.status === false);

  // Calculate total revenue
  const totalRevenue = paidOrders.reduce(
    (sum, order) => sum + parseFloat(order.amount),
    0
  );

  return (
    <div className="p-4">
      <Helmet>
        <title>PillPoint | History</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">My Medicines Revenue</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Total Revenue: Tk {totalRevenue.toFixed(2)}</h3>
        <p>Paid Orders: {paidOrders.length}</p>
        <p>Pending Orders: {pendingOrders.length}</p>
      </div>

      {/* Paid Orders */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Paid Orders</h3>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Email</th>
              <th className="border border-gray-300 px-2 py-1">Amount</th>
              <th className="border border-gray-300 px-2 py-1">Transaction ID</th>
              <th className="border border-gray-300 px-2 py-1">Medicines</th>
            </tr>
          </thead>
          <tbody>
            {paidOrders.map(order => (
              <tr key={order._id}>
                <td className="border border-gray-300 px-2 py-1">{order.email}</td>
                <td className="border border-gray-300 px-2 py-1">Tk {order.amount}</td>
                <td className="border border-gray-300 px-2 py-1">{order.transactionId}</td>
                <td className="border border-gray-300 px-2 py-1">
                  {order.items
                    .filter(item => myMedicineIds.includes(item._id))
                    .map(item => item.itemName)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pending Orders */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Pending Orders</h3>
        <table className="table-auto border-collapse border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1">Email</th>
              <th className="border border-gray-300 px-2 py-1">Amount</th>
              <th className="border border-gray-300 px-2 py-1">Transaction ID</th>
              <th className="border border-gray-300 px-2 py-1">Medicines</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map(order => (
              <tr key={order._id}>
                <td className="border border-gray-300 px-2 py-1">{order.email}</td>
                <td className="border border-gray-300 px-2 py-1">Tk {order.amount}</td>
                <td className="border border-gray-300 px-2 py-1">{order.transactionId}</td>
                <td className="border border-gray-300 px-2 py-1">
                  {order.items
                    .filter(item => myMedicineIds.includes(item._id))
                    .map(item => item.itemName)
                    .join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Revenue;
