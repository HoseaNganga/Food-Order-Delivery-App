import MenuItem from "@/Models/MenuItemModel/MenuItemModel";
import mongoose from "mongoose";
export const POST = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  const data = await req.json();

  const menuItemDoc = await MenuItem.create(data);
  return Response.json(menuItemDoc);
};

export const GET = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  return Response.json(await MenuItem.find());
};

export const PUT = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);

  const { _id, ...data } = await req.json();

  await MenuItem.findByIdAndUpdate(_id, data);
  return Response.json(true);
};

export const DELETE = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  const url = new URL(req.url);
  const _id = url.searchParams.get("id");
  await MenuItem.deleteOne({ _id });
  return Response.json(true);
};
