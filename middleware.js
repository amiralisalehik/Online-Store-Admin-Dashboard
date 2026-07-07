import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ADMIN_ONLY_PATHS = ["/users"];

export async function middleware(request) {
  const token = request.cookies.get("admin_token")?.value;

  // dont have token => redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    // token verification
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const isAdminOnlyPath = ADMIN_ONLY_PATHS.some((path) =>
      request.nextUrl.pathname.startsWith(path),
    );

    if(isAdminOnlyPath && payload.role !== "admin"){
      return NextResponse.redirect(new URL("/" , request.url))
    }

    // verification ok => must go
    return NextResponse.next();
  } catch (error) {
    console.error("token verification faild", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/products/:path*", "/orders/:path*" , "/users/:path*"],
};
