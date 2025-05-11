"use client";

import type React from "react";

import { BottomNavigation } from "@/components/bottom-navigation";
import { SideNavigation } from "@/components/side-navigation";
import { useScreenSize } from "@/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  CalendarClock,
  CircleCheckBig,
  ClockFading,
  Home,
  ScanFace,
  User,
  Users,
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
  isOnlySideNavigation?: boolean;
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
    href: "/registers",
  },
  {
    icon: ScanFace,
    label: "Registro ponto",
    href: "/check-in",
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
  {
    icon: Users,
    label: "Colaboradores",
    href: "/employees",
    isOnlySideNavigation: true,
  },
  {
    icon: CalendarClock,
    label: "Jornadas",
    href: "/work-schedules",
    isOnlySideNavigation: true,
  },
  {
    icon: Building2,
    label: "Setores",
    href: "/departments",
    isOnlySideNavigation: true,
  },
  {
    icon: BarChart3,
    label: "Relatórios",
    href: "/reports",
    isOnlySideNavigation: true,
  },
];

export function MainNavigation({ children }: MainNavigationProps) {
  const { isLargeScreen } = useScreenSize();

  return (
    <div className="min-h-screen">
      <div className="lg:hidden">
        <div className="flex items-center justify-center  border-b border-gray-200 bg-white px-4 py-4">
          <div className="flex items-center">
            <img src="/assets/logo-short.png" alt="logo" className="h-7 mr-2" />
            <span className="text-lg font-bold">
              Ponto<span className="text-primary">TRI</span>
            </span>
          </div>
        </div>
      </div>

      {isLargeScreen && <SideNavigation />}

      <main
        className={cn(
          "flex min-h-screen flex-col",
          isLargeScreen ? "ml-64" : ""
        )}
      >
        <div className="flex-1">{children}</div>

        {!isLargeScreen && <div className="h-16" />}
      </main>

      <BottomNavigation />
    </div>
  );
}
