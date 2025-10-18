const CartCard = ({ cart, handleRemoveFromCart }) => {
  // console.log(cart);
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={cart.imgUrl} alt={cart.itemName} />
              </div>
            </div>
            <div>
              <div className="font-bold">{cart.itemName}</div>
              <div className="text-sm opacity-50">{cart.company}</div>
            </div>
          </div>
        </td>
        <td>{cart.cartQuantity}</td>
        <td>
          {cart.perUnitPrice}
          <br />
          <span className="badge badge-ghost badge-sm">{cart.discount} %</span>
        </td>
        <td>Tk {Number(cart.totalPrice).toFixed(2)}</td>
        <th>
          <button
            onClick={() => handleRemoveFromCart(cart)}
            className="btn btn-ghost btn-xs"
          >
            Remove
          </button>
        </th>
      </tr>
    </>
  );
};
export default CartCard;
