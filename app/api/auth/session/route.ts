import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://notehub-api.goit.study";

export async function GET(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/auth/session`, {
      method: "GET",
      headers: {
        Cookie: cookies || "",
      },
      credentials: "include",
    });

    if (!response.ok) {
      return NextResponse.json(null, { status: 200 });
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}