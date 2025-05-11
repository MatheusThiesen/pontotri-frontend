"use client";

import type React from "react";

import { BottomNavigation } from "@/components/bottom-navigation";
import { SideNavigation } from "@/components/side-navigation";
import { useScreenSize } from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import {
  CircleCheckBig,
  ClockFading,
  Home,
  ScanFace,
  User,
} from "lucide-react";

interface MainNavigationProps {
  children: React.ReactNode;
}

type MenuItemProps = {
  label: string;
  href: string;
  isPrincipal?: boolean;
  isNew?: boolean;
  icon: any;
  isOnlyBottomNavigation?: boolean;
};

export const menuItems: MenuItemProps[] = [
  {
    icon: Home,
    label: "Início",
    href: "/home",
  },
  {
    icon: ClockFading,
    label: "Registros",
    href: "/records",
  },
  {
    icon: ScanFace,
    label: "Registro ponto",
    href: "/register",
    isPrincipal: true,
  },
  {
    icon: CircleCheckBig,
    label: "Pedidos",
    href: "/requests",
  },
  {
    icon: User,
    label: "Perfil",
    href: "/profile",
    isOnlyBottomNavigation: true,
  },
];

export function MainNavigation({ children }: MainNavigationProps) {
  const { isLargeScreen } = useScreenSize();

  return (
    <div className="min-h-screen">
      {isLargeScreen && <SideNavigation />}

      <main
        className={cn(
          "flex min-h-screen flex-col",
          isLargeScreen ? "ml-64" : ""
        )}
      >
        <div className="flex-1">{children}</div>

        {/* Add padding at the bottom for mobile to prevent content from being hidden behind the navigation */}
        {!isLargeScreen && <div className="h-16" />}
      </main>

      <BottomNavigation />
    </div>
  );
}
