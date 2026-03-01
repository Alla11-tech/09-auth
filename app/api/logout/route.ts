import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://notehub-api.goit.study";

export async function POST(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      headers: {
        Cookie: cookies || "",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Logout failed" },
        { status: response.status }
      );
    }

    const setCookieHeader = response.headers.get("set-cookie");

    const nextResponse = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );

    if (setCookieHeader) {
      nextResponse.headers.set("set-cookie", setCookieHeader);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}