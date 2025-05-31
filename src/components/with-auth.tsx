"use client";

import type { Role } from "@/lib/contexts/AuthProvider";
import { useAuth } from "@/lib/contexts/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type WithAuthOptions = {
  allowedRoles: Role[];
};

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: WithAuthOptions
): React.FC<P> {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const { me, isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated || !options.allowedRoles.includes(me.role)) {
        router.replace("/home");
      }
    }, [isAuthenticated, me]);

    if (!isAuthenticated || !options.allowedRoles.includes(me.role)) {
      return null;
    }

    return <Component {...props} />;
  };
}
