import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  // Якщо приватний маршрут
  if (isPrivateRoute) {
    // Є accessToken - пропускаємо
    if (accessToken) {
      return NextResponse.next();
    }

    // Немає accessToken, але є refreshToken - пробуємо оновити
    if (refreshToken) {
      try {
        const response = await checkSession();
        
        if (response?.data) {
          const nextResponse = NextResponse.next();
          
          // Оновлюємо cookies якщо є нові токени
          const setCookieHeaders = response.headers?.["set-cookie"];
          if (setCookieHeaders) {
            if (Array.isArray(setCookieHeaders)) {
              setCookieHeaders.forEach((cookie) => {
                nextResponse.headers.append("set-cookie", cookie);
              });
            } else {
              nextResponse.headers.set("set-cookie", setCookieHeaders);
            }
          }
          
          return nextResponse;
        }
      } catch {
        // Якщо не вдалося оновити - редірект на sign-in
        return NextResponse.redirect(new URL("/sign-in", request.url));
      }
    }

    // Немає жодного токена - редірект
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Якщо auth маршрут і користувач авторизований - на profile
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};