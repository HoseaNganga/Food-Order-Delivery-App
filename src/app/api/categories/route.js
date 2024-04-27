import Category from "@/Models/CategoryModel/CategoryModel";
import mongoose from "mongoose";

export const POST = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return Response.json(categoryDoc);
};

export const GET = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  return Response.json(await Category.find());
};

export const PUT = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  const { _id, name } = await req.json();
  await Category.updateOne({ _id }, { name });
  return Response.json(true);
};

export const DELETE = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  const url = new URL(req.url);
  const _id = url.searchParams.get("id");
  await Category.deleteOne({ _id });

  return Response.json(true);
};
