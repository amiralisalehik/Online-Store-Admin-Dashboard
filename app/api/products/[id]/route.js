import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  await connectToDatabase();
  const { id } = await params;
  const product = await Product.findById(id);

  if (!product) {
    return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
  }

  await product.deleteOne();
  return NextResponse.json({ message: "محصول حذف شد" }, { status: 200 });
}

export async function PUT(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const data = await req.json();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ message: "محصولی یافت نشد" }, { status: 404 });
    }
    await Object.assign(product, data);
    await product.save();
    return NextResponse.json({ message: "محصول آپدیت شد" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در ارتباط با سرور" },
      { status: 500 },
    );
  }
}

export async function GET(req, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "محصول یافت نشد" }, { status: 404 });
    }
    return NextResponse.json({ product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
