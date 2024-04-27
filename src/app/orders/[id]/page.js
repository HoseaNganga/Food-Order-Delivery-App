"use client";
import {
  CartContext,
  cartProductPrice,
} from "@/Components/AppContext/AppProvider";
import UserAddressForm from "@/Components/UserAddressForm/UserAddressForm";
import ReUseSectionHeaders from "@/Components/ReUseSectionHeaders/ReUseSectionHeaders";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ReUseCartProduct from "@/Components/ReUseCartProductDiv/ReUseCartProduct";
const OrderPage = () => {
  const { clearCart } = useContext(CartContext);
  const { id } = useParams();
  const [order, setOrder] = useState();
  useEffect(() => {
    if (typeof window.console !== "undefined") {
      if (window.location.href.includes("clear-cart=1")) {
        clearCart();
      }
    }
    if (id) {
      fetch(`/api/orders?_id=${id}`)
        .then((resp) => resp.json())
        .then((data) => {
          setOrder(data);
        });
    }
  }, []);
  let subtotal = 0;
  if (order?.cartProducts) {
    for (const product of order?.cartProducts) {
      subtotal += cartProductPrice(product);
    }
  }

  return (
    <section>
      <div className="text center">
        <ReUseSectionHeaders header2={"your order"} />
        <div>
          <p className="text-center"> Thanks for your Order</p>
          <p className="text-center">
            We will call you when your order is ready
          </p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 glassmorphism max-w-2xl m-auto">
        <div className="glassmorphism">
          {order?.cartProducts &&
            order.cartProducts.map((product) => (
              <ReUseCartProduct key={product._id} product={product} />
            ))}

          {order && (
            <div className="style_btn hover:bg-green-600 w-full ">
              Total:${subtotal + 5}
            </div>
          )}
        </div>

        <div className="glassmorphism">
          <form>{order && <UserAddressForm addressProp={order} />}</form>
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
