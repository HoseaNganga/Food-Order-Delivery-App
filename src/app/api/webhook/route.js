import Orders from "@/Models/Orders/OrderModel";
const stripe = require("stripe")(process.env.STRIPE_SIGNINGSECRET);

export const POST = async (req) => {
  const sig = req.headers.get("stripe-signature");
  let event;
  try {
    const reqBuffer = await req.text();
    const signSecret = process.env.STRIPE_SIGNINGSECRET;
    event = stripe.webhooks.constructEvent(reqBuffer, sig, signSecret);
  } catch (error) {
    console.error("stripe error");
    console.log(e);
    return Response.json(e, { status: 400 });
  }
  if (event.type === "checkout.session.completed") {
    console.log(event);
    const orderId = event?.data?.object?.metadata?.orderId;
    const isPaid = event?.data?.object?.payment_status === "paid";
    if (isPaid) {
      await Orders.updateOne({ _id: orderId }, { paid: true });
    }
  }

  return Response.json("ok", { status: 200 });
};
