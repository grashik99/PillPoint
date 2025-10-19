import axios from "axios";
import useAuthInfo from "../../../hooks/useAuthInfo";
import CartCard from "./CartCard";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import CheckoutForm from "./CheckoutForm";
import { Helmet } from "react-helmet";

const Cart = () => {
  const { user, userCart, userFromMongo, refrash, setRefrash, cartCost } =
    useAuthInfo();

  const mergedCart = userFromMongo?.cart
    ?.map((item) => {
      const medicine = userCart.find((m) => m._id === item.medicineId);
      if (!medicine) return null;

      const perUnitPrice = parseFloat(medicine.perUnitPrice);
      const discount = parseInt(medicine.discount) || 0;
      const netPrice = perUnitPrice * (1 - discount / 100);
      const totalPrice = netPrice * item.cartQuantity;

      return {
        ...medicine,
        totalPrice,
      };
    })
    .filter(Boolean);

  const handleRemoveFromCart = (cart) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put("https://pill-point-server-one.vercel.app/user/cart/remove", {
            email: user?.email,
            productId: cart._id,
          })
          .then((res) => {
            if (res.data.modifiedCount === 1) {
              Swal.fire({
                title: "Removed!",
                icon: "success",
              });
              setRefrash(refrash + 1);
            }
          })
          .catch((err) => {
            if (err) {
              Swal.fire({
                title: "Failed!",
                icon: "error",
              });
            }
          });
      }
    });
  };

  const handleCheckout = () => {
    document.getElementById("my_modal_3").showModal();
  };

  return (
    <div className="p-4">
      <Helmet>
        <title>PillPoint | Cart</title>
      </Helmet>
      <div className="overflow-x-auto">
        {!mergedCart?.length && (
          <Link to="/">
            <div className="card card-compact bg-base-100 w-96 mx-auto my-44 shadow-xl">
              <figure>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2762/2762885.png"
                  alt="Empty_Cart"
                  className="size-42"
                />
              </figure>
              <div className="card-body text-center">
                <h2 className="text-2xl text-center">No items in cart.</h2>
                <p>Explore our medicines</p>
              </div>
            </div>
          </Link>
        )}

        {mergedCart?.length > 0 && (
          <>
            <div className="bg-base-200 p-4 mb-2 flex justify-between items-center">
              <div>
                <p className="text-xl font-medium italic">
                  Subtotal: ৳ {cartCost}/=
                </p>
              </div>
              <div>
                <button onClick={handleCheckout} className="btn  bg-pink-400">
                  <span className="text-xl mr-2">
                    <FaShoppingCart />
                  </span>
                  <span className="italic">Checkout</span>
                </button>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Medicine Details</th>
                  <th>Quantity</th>
                  <th>
                    Per Unit Price <br /> Discount
                  </th>
                  <th>Total Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {mergedCart.map((cart, index) => (
                  <CartCard
                    key={index}
                    cart={cart}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      {/* Checkout Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="card mx-auto">
            <div className="card-body">
              <h2 className="card-title flex items-center gap-2 italic">
                <FaShoppingCart className="text-base-200" size={22} />
                Checkout
              </h2>

              {/* Coupon Section */}
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Coupon Code : </span>
                </label>
                <div className="join">
                  <input
                    type="text"
                    placeholder="Enter coupon"
                    className="input input-bordered join-item w-full"
                  />
                  <button className="btn btn-base-200 join-item">Apply</button>
                </div>
              </div>

              {/* Total Price */}
              <div className="flex justify-between items-center mt-6 text-lg font-semibold">
                <span>Subtotal :</span>
                <span className=" italic">৳ {cartCost}/=</span>
              </div>
              <p>Card No: 4242 4242 4242 4242</p>

              {/* Stripe CheckoutForm */}
              <div className="card-actions mt-6">
                <CheckoutForm amount={cartCost} />
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};
export default Cart;
