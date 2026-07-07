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
      { error: "شما نمی توانید خودتان را حذف کنید!" },
      { status: 400 },
    );
  }
  await Admins.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
