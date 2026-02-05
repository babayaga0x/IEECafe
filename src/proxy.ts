import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname === "/") {
    url.pathname = "/menu";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      console.log("No token - redirect to /profile");
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }

    try {
      const apiUrl = new URL("/api/users/me", req.url);

      const response = await fetch(apiUrl, {
        headers: {
          Cookie: `token=${token}`,
        },
      });

      if (!response.ok) {
        url.pathname = "/profile";
        return NextResponse.redirect(url);
      }

      const data = await response.json();

      if (data.user?.role !== "admin") {
        url.pathname = "/profile";
        return NextResponse.redirect(url);
      }

      return NextResponse.next();
    } catch (error) {
      console.error("Auth check failed:", error);
      url.pathname = "/profile";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
