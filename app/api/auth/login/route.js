import { connectToDatabase } from "@/lib/mongodb";
import Admins from "@/models/Admins";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectToDatabase();
  const { username, password } = await request.json();

  const admin = await Admins.findOne({ username : username });

  if (!admin) {
    return NextResponse.json(
      { error: "نام کاربری اشتباه است" },
      { status: 401 },
    );
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: "پسورد اشتباه است" }, { status: 401 });
  }

  //   login successfull must make a token
  const token = jwt.sign(
    {
      adminId: admin._id.toString(),
      username: admin.username,
      role: admin.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  (await cookies()).set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return NextResponse.json({ success: true });
}
