import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import useAuthInfo from "../../../hooks/useAuthInfo";
import { useNavigate } from "react-router";

export default function CheckoutForm() {
  const { user, cartCost, userCart, refrash, setRefrash } = useAuthInfo();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const clearCart = async (userEmail) => {
    try {
      const res = await axios.put("https://pill-point-server-one.vercel.app/clear-cart", {
        email: userEmail,
      });
      // console.log(res.data.message);
    } catch (error) {
      // console.error("Error clearing cart:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Step 1: Get client secret from backend
    const { data } = await axios.post(
      "https://pill-point-server-one.vercel.app/create-payment-intent",
      {
        amount: Math.round(cartCost * 100),
      }
    );

    const clientSecret = data.clientSecret;

    // Step 2: Confirm card payment
    const cardElement = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent.status === "succeeded") {
      // console.log("Payment Completed", userCart);
      setMessage("Payment successful ✅");
      document.getElementById("my_modal_3").close();

      const transactionId = paymentIntent.id;

      await axios
        .post("https://pill-point-server-one.vercel.app/orders", {
          email: user.email,
          amount: cartCost,
          transactionId: paymentIntent.id,
          items: userCart, // all cart items
          status: false,
        })
        .then((res) => {
          if (res.data.invoiceUrl) {
            clearCart(user.email);
            setRefrash(refrash + 1);
          }
        });

      //   navigate(`/dashboard/invoice/${transactionId}`)
      navigate(`/dashboard/invoice/${transactionId}`);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded w-full bg-white"
    >
      <CardElement className="border border-black p-4 rounded-l" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-8 p-2  rounded btn"
      >
        {loading ? "Processing..." : `Pay Now: ৳ ${cartCost}`}
      </button>
      {message && <p className="mt-2 bg-base-200 p-2 rounded-l">{message}</p>}
    </form>
  );
}
