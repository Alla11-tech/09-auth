"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { checkSession, logout } from "@/lib/api/clientApi";

const PRIVATE_ROUTES = ["/profile", "/notes"];

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { setUser, clearAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
        pathname.startsWith(route)
      );

      if (isPrivateRoute) {
        try {
          const user = await checkSession();
          if (user) {
            setUser(user);
          } else {
            await logout();
            clearAuth();
            router.push("/sign-in");
          }
        } catch {
          clearAuth();
          router.push("/sign-in");
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, setUser, clearAuth, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const isPrivateRoute = PRIVATE_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}