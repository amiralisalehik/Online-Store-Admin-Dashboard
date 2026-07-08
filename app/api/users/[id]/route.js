import bcrypt from "bcryptjs";
import { getSession } from "@/lib/getSession";
import { connectToDatabase } from "@/lib/mongodb";
import Admins from "@/models/Admins";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { id } = await params;

  const session = await getSession(req);

  if (!session) {
    return NextResponse.json({ error: "لاگین نشده اید" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  await connectToDatabase();

  if (id === session.adminId) {
    return NextResponse.json(
      { error: "!شما نمی توانید خودتان را حذف کنید" },
      { status: 400 },
    );
  }
  await Admins.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}

export async function PUT(req, { params }) {
  const { id } = await params;

  const session = await getSession(req);

  if (!session) {
    return NextResponse.json({ error: "لاگین نشده اید" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  const { username, password, role } = await req.json();
  if (!username || !role) {
    return NextResponse.json(
      {
        error: "نام کاربری  و نقش وارد نشده است",
      },
      { status: 400 },
    );
  }

  if (role !== "admin" && role !== "operator") {
    return NextResponse.json({ error: "نقش نامعتبر" }, { status: 400 });
  }

  await connectToDatabase();

  const existing = await Admins.findOne({ username, _id: { $ne: id } });

  if (existing) {
    return NextResponse.json(
      { error: "این نام کاربری قبلا استفاده شده است" },
      { status: 409 },
    );
  }

  const updateData = {
    username,
    role,
  };

  if (password) {
    updateData.password = await bcrypt.hash(password, 10);
  }

  const admin = await Admins.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!admin) {
    return NextResponse.json({ error: "کاربر پیدا نشد" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function GET(request , { params }) {
  const session = await getSession(request);

  if (!session) {
    return NextResponse.json({ error: "لاگین نشده اید" }, { status: 401 });
  }

  if (session.role !== "admin") {
    return NextResponse.json({ error: "دسترسی غیرمجاز" }, { status: 403 });
  }

  await connectToDatabase();
  const { id } = await params;

  const admin = await Admins.findById(id , { password: 0 });

  return NextResponse.json({ success: true, admin: admin });
}
