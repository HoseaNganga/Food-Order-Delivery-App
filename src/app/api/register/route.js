import mongoose from "mongoose";
import User from "@/Models/UserModel/UserModel";
import bcrypt from "bcrypt";

export const POST = async (req) => {
  const reqBody = await req.json();
  await mongoose.connect(process.env.MONGODB_URI);
  const unhashedPass = reqBody.password;
  if (unhashedPass.length || unhashedPass.length < 5) {
    new Error("Password must be atleast 5 characters long!");
  }
  const unHashedPassword = unhashedPass;
  const salt = await bcrypt.genSalt(10);
  reqBody.password = await bcrypt.hash(unHashedPassword, salt);

  const createdUser = await User.create(reqBody);

  return Response.json(createdUser);
};
