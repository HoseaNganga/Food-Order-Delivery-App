import mongoose from "mongoose";
import User from "@/Models/UserModel/UserModel";
export const GET = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  const users = await User.find();
  return Response.json(users);
};
