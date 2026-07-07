import bcrypt from "bcryptjs";
import { getSession } from "@/lib/getSession";
import { connectToDatabase } from "@/lib/mongodb";
import Admins from "@/models/Admins";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getSession(request);

  if (!session) {
    return NextResponse.json({ error: "لاگین نشده اید" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const { username, password, role } = await request.json();

  if (!username || !password || !role) {
    return NextResponse.json(
      {
        error: "نام کاربری رمز عبور و نقش الزامی است",
      },
      { status: 400 },
    );
  }

  if (role !== "admin" && role !== "operator") {
    return NextResponse.json({ error: "نقش نامعتبر" }, { status: 400 });
  }

  await connectToDatabase();

  const existing = await Admins.findOne({ username });

  if (existing) {
    return NextResponse.json(
      { error: "این نام کاربری قبلا استفاده شده است" },
      { status: 409 },
    );
  }

  const handlePassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admins.create({
    username: username,
    password: handlePassword,
    role: role,
  });

  return NextResponse.json({
    success: true,
    user: { username: newAdmin.username, role: newAdmin.role },
  });
}

export async function GET(request) {
  const session = await getSession(request);

  if (!session) {
    return NextResponse.json({ error: "لاگین نشده اید" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }


  await connectToDatabase();

  const admins = await Admins.find({}, { password: 0 });

  return NextResponse.json({
    success: true,
    admins: admins,
  });
}
