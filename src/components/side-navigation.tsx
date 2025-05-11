"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "./main-navigation";

interface SideNavigationProps {
  className?: string;
}

export function SideNavigation({ className }: SideNavigationProps) {
  const pathname = usePathname();
  const user = {
    avatarUrl: "",
    email: "fulano@fulano.com",
    name: "fulano",
  };

  const getInitials = () => {
    if (!user?.name) return "U";
    return user.name.charAt(0).toUpperCase();
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r bg-background",
        className
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <img src="/assets/logo-short.png" alt="logo" className="h-10 mr-2" />
        <h1 className="text-xl font-bold">
          Ponto<span className="text-primary">TRI</span>
        </h1>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems
            .filter((f) => !f.isOnlyBottomNavigation)
            .map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      item.isPrincipal ? "font-medium" : ""
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5",
                        item.isNew ? "text-primary" : ""
                      )}
                    />
                    <span>{item.label}</span>
                    {item.isNew && (
                      <span className="ml-auto rounded-full bg-primary px-2 py-0.5 text-xs text-primary-foreground">
                        Novo
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>

      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left hover:bg-muted">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={user?.avatarUrl || ""}
                  alt={user?.name || "User"}
                />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">
                  {user?.name || "User"}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link
                href="/profile"
                className="flex cursor-pointer items-center"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Perfil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => {}}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
