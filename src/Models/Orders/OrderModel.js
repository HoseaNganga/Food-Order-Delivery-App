import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    userEmail: {
      type: String,
    },

    phone: {
      type: String,
    },
    streetAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
    postalCode: {
      type: String,
    },
    cartProducts: {
      type: Object,
    },
    paid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Orders = models.Orders || model("Orders", orderSchema);

export default Orders;
