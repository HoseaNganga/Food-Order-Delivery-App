import mongoose from "mongoose";
import Orders from "@/Models/Orders/OrderModel";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import MenuItem from "@/Models/MenuItemModel/MenuItemModel";

const stripe = require("stripe")(process.env.STRIPE_SECRETKEY);
export const POST = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  const { cartProducts, address } = await req.json();
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  const orderDoc = await Orders.create({
    userEmail,
    ...address,
    cartProducts,
    paid: false,
  });
  const stripeLineItems = [];
  for (const cartProduct of cartProducts) {
    const productName = cartProduct.name;
    const productInfo = await MenuItem.findById(cartProduct._id);
    let productPrice = productInfo.price;
    if (cartProduct.extras) {
      const productSize = productInfo.sizes.find(
        (size) => size._id.toString() === cartProduct.extras._id.toString()
      );
      productPrice += productSize.price;
    }
    if (cartProduct.size?.length > 0) {
      for (const cartProductExtras of cartProduct.size) {
        const productExtra = productInfo.extraIngredients.find(
          (extra) => extra._id.toString() === cartProductExtras._id.toString()
        );
        productPrice += productExtra.price;
      }
    }
    stripeLineItems.push({
      quantity: 1,
      price_data: {
        currency: "USD",
        product_data: {
          name: productName,
        },
        unit_amount: productPrice * 100,
      },
    });
  }

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: stripeLineItems,
    mode: "payment",
    customer_email: userEmail,
    success_url:
      process.env.NEXTAUTH_URL +
      `orders/` +
      orderDoc._id.toString() +
      "?clear-cart=1",
    cancel_url: process.env.NEXTAUTH_URL + `cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString() },
    payment_intent_data: {
      metadata: { orderId: orderDoc._id.toString() },
    },
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery fee",
          type: "fixed_amount",
          fixed_amount: { amount: 500, currency: "USD" },
        },
      },
    ],
  });

  return Response.json(stripeSession.url);
};
