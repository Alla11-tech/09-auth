import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://notehub-api.goit.study";

export async function GET(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/users/me`, {
      method: "GET",
      headers: {
        Cookie: cookies || "",
      },
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch user" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const cookies = request.headers.get("cookie");
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies || "",
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to update user" },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}