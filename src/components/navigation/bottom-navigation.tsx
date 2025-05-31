"use client";

import { useAuth } from "@/lib/contexts/AuthProvider";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./main-navigation";

interface BottomNavigationProps {
  className?: string;
}

export function BottomNavigation({ className }: BottomNavigationProps) {
  const { me } = useAuth();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 z-50 w-full border-t bg-background lg:hidden",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-md items-center justify-around px-4">
        {menuItems
          .filter((f) => !f.isOnlySideNavigation)
          .filter((f) => f.roles.includes(me.role))
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center",
                  item.isPrincipal ? "relative -mt-6" : ""
                )}
              >
                {item.isPrincipal ? (
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <item.icon className="h-6 w-6" />
                  </div>
                ) : (
                  <item.icon
                    className={cn(
                      "h-6 w-6",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground transition-colors hover:text-foreground"
                    )}
                  />
                )}
                <span
                  className={cn(
                    "mt-1 text-xs",
                    isActive
                      ? "font-medium text-primary"
                      : "text-muted-foreground",
                    item.isPrincipal ? "sr-only" : ""
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
