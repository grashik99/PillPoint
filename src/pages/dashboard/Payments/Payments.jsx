import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthInfo from "../../../hooks/useAuthInfo";
import OrderCard from "./OrderCard";
import axios from "axios";
import { Helmet } from "react-helmet";

const Payments = () => {
  const { orders, refrash, setRefrash } = useAuthInfo();
  const queryClient = useQueryClient();
  console.log(orders)

  // console.log(orders)
  const toggleOrderMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.patch(
        `https://pill-point-server-one.vercel.app/orders/${id}/toggle`
      );
      return res.data;
    },
    onSuccess: () => {
      setRefrash(refrash + 1); // your state update
      queryClient.invalidateQueries(["orders"]); // refresh orders query if you have one
    },
    onError: (err) => {
      console.error("Error toggling order:", err);
    },
  });

  // Function to handle payment button click
  const handlePayment = (id) => {
    toggleOrderMutation.mutate(id);
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>PillPoint | All Payments</title>
      </Helmet>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Transaction Id</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <OrderCard
                key={order._id}
                order={order}
                index={index}
                handlePayment={handlePayment}
                isLoading={toggleOrderMutation.isLoading} // disable button while updating
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;
