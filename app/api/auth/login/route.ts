import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://notehub-api.goit.study";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Login failed" },
        { status: response.status }
      );
    }

    const cookies = response.headers.get("set-cookie");

    const nextResponse = NextResponse.json(data, { status: 200 });

    if (cookies) {
      nextResponse.headers.set("set-cookie", cookies);
    }

    return nextResponse;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}