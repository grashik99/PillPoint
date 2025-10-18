import { Helmet } from "react-helmet";
import useAuthInfo from "../../../hooks/useAuthInfo";

const PaymentHistory = () => {
  const { orders, user } = useAuthInfo();

  // Filter orders that belong to the current user
  const myOrders = orders?.filter(order => order.email === user.email);

  return (
    <div className="p-4">
      <Helmet>
        <title>PillPoint | Payment History</title>
      </Helmet>
      <h2 className="text-2xl font-bold mb-4">Payment History for {user.email}</h2>

      {myOrders && myOrders.length > 0 ? (
        <div className="space-y-6">
          {myOrders.map((order) => (
            <div key={order._id} className="border rounded p-4 shadow-sm">
              <div className="flex justify-between mb-2">
                <p><strong>Transaction ID:</strong> {order.transactionId}</p>
                <p><strong>Status:</strong> {order.status ? "Paid" : "Pending"}</p>
              </div>
              <p className="mb-2"><strong>Amount:</strong> Tk {order.amount}</p>
              <p className="mb-2"><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

              <table className="w-full table-auto border-collapse border">
                <thead>
                  <tr className="bg-base-200">
                    <th className="border px-2 py-1">Item Name</th>
                    <th className="border px-2 py-1">Generic Name</th>
                    <th className="border px-2 py-1">Category</th>
                    <th className="border px-2 py-1">Company</th>
                    <th className="border px-2 py-1">Price</th>
                    <th className="border px-2 py-1">Quantity</th>
                    <th className="border px-2 py-1">Discount %</th>
                    <th className="border px-2 py-1">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id} className="text-center">
                      <td className="border px-2 py-1">{item.itemName}</td>
                      <td className="border px-2 py-1">{item.itemGenericName}</td>
                      <td className="border px-2 py-1">{item.category}</td>
                      <td className="border px-2 py-1">{item.company}</td>
                      <td className="border px-2 py-1">Tk {item.perUnitPrice}</td>
                      <td className="border px-2 py-1">{item.cartQuantity}</td>
                      <td className="border px-2 py-1">{item.discount}%</td>
                      <td className="border px-2 py-1">
                        Tk {((item.perUnitPrice * item.cartQuantity * (1 - item.discount / 100)) || 0).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        <p>No orders found for your account.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
