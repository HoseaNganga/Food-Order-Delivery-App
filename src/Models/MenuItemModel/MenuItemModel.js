import mongoose, { Schema, model, models } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    category: {
      type: mongoose.Types.ObjectId,
    },
    sizes: { type: [ExtraPriceSchema] },
    extraIngredients: { type: [ExtraPriceSchema] },
  },
  {
    timestamps: true,
  }
);

const MenuItem = models.MenuItem || model("MenuItem", MenuItemSchema);
export default MenuItem;
