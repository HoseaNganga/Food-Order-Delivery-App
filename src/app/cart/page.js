"use client";
import toast from "react-hot-toast";

import {
  CartContext,
  cartProductPrice,
} from "@/Components/AppContext/AppProvider";
import ReUseSectionHeaders from "@/Components/ReUseSectionHeaders/ReUseSectionHeaders";
import UserAddressForm from "@/Components/UserAddressForm/UserAddressForm";
import { useContext, useEffect, useState } from "react";
import { useProfile } from "@/Components/UserProfileData/UseProfileData";
import ReUseCartProduct from "@/Components/ReUseCartProductDiv/ReUseCartProduct";

const CartPage = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = useProfile();
  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAddress, postalCode, city, country } = profileData;
      const addressData = { phone, streetAddress, postalCode, city, country };
      setAddress(addressData);
    }
  }, [profileData]);

  let total = 0;
  for (const p of cartProducts) {
    total += cartProductPrice(p);
  }

  function handleAddressChange(propName, val) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: val }));
  }

  const proceedToCheckOut = async (e) => {
    e.preventDefault();
    const paymentSolvingPromise = new Promise(async (resolve, reject) => {
      const resp = await fetch(`/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, cartProducts }),
      });

      if (resp.ok) {
        resolve();
        window.location = await resp.json();
      } else {
        reject();
      }
    });
    await toast.promise(paymentSolvingPromise, {
      loading: "Processing payment..",
      success: "Redirecting to Payment.. ",
      error: "error",
    });
  };

  if (cartProducts?.length === 0) {
    return (
      <section className="text-center">
        <ReUseSectionHeaders header2={"cart"} />
        <p className="mt-4">Your shopping cart is empty</p>
      </section>
    );
  }

  return (
    <section>
      <ReUseSectionHeaders header1={"cart"} header2={"check out"} />
      <div className="mt-4 grid grid-cols-2 gap-4 glassmorphism">
        <div>
          {cartProducts?.length === 0 && (
            <div>No Products in your shopping Cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <ReUseCartProduct
                product={product}
                removeCartProduct={removeCartProduct}
                key={product._id}
              />
            ))}
          <div className="form_input font-semibold flex justify-between gap-2">
            <h3>Total:</h3>
            <p>${total}</p>
          </div>
        </div>
        <div className="glassmorphism">
          <ReUseSectionHeaders header2={"checkout"} />
          <form onSubmit={proceedToCheckOut}>
            <UserAddressForm
              addressProp={address}
              setAddressProp={handleAddressChange}
            />

            <div className="mt-4">
              <button
                type="submit"
                className="style_btn hover:bg-green-600 w-full "
              >
                Pay ${total}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
