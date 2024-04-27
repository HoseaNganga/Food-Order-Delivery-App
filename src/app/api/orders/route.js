import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/Models/UserModel/UserModel";
import Orders from "@/Models/Orders/OrderModel";

export const GET = async (req) => {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  let isAdmin = false;
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (_id) {
    const data = await Orders.findById(_id);
    return Response.json(data);
  }
  if (userEmail) {
    const userInfo = await User.findOne({ email: userEmail });
    if (userInfo) {
      isAdmin = userInfo.admin;
    }
  }

  if (isAdmin) {
    return Response.json(await Orders.find());
  }

  if (userEmail) {
    return Response.json(await Orders.find({ userEmail }));
  }

  return Response.json(true);
};
