import { connectToDatabase } from "@/lib/mongodb";
import Order from "@/models/Order";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const order = await Order.find({});
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
