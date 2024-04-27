import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/Models/UserModel/UserModel";
export const PUT = async (req) => {
  await mongoose.connect(process.env.MONGODB_URI);
  const requestData = await req.json();
  const { _id, ...data } = requestData;
  console.log(_id);
  if (_id) {
    await User.updateOne({ _id }, requestData);
  } else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;

    await User.updateOne({ email }, requestData);
  }

  return Response.json(true);
};

export const GET = async (req) => {
  await mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  return Response.json(await User.findOne({ email }));
};
