import { useEffect } from "react";
import { useCartStore } from "../store/useCartStore";

export default function Cart() {
  const { cartItems, fetchCart, isLoading } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (isLoading) return <div>Loading cart...</div>;
  if (!cartItems.length) return <div>YOUR CART IS EMPTY</div>;

  return (
    <div>
      {cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.productName}</h3>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
}
