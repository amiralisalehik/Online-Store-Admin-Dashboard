import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("تنظیمات دیتابیس را وارد کنید");
}

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return console.log("قبلا دیتابیس متصل شده");
  }

  try {
    await mongoose.connect(uri, { dbName: "test" });
    isConnected = true;
    console.log("اتصال موفق به دیتابس");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
