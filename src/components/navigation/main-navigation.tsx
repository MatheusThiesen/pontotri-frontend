"use client";

import type React from "react";

import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { SideNavigation } from "@/components/navigation/side-navigation";
import { Role } from "@/lib/contexts/AuthProvider";
import { useScreenSize } from "@/lib/hooks/use-screen-size";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Building2,
  CalendarClock,
  CircleCheckBig,
  ClockFading,
  Home,
  MapPin,
  ScanFace,
  Settings,
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
  roles: Role[];
};

type GroupedMenuItemProps = {
  title: string;
  items: MenuItemProps[];
};

export const groupedMenusItems: GroupedMenuItemProps[] = [
  {
    title: "",
    items: [
      {
        icon: Home,
        label: "Início",
        href: "/home",
        roles: ["ADMIN", "OWNER", "MANAGER", "EMPLOYEE"],
      },
      {
        icon: ClockFading,
        label: "Registros",
        href: "/registers",
        roles: ["ADMIN", "OWNER", "MANAGER", "EMPLOYEE"],
      },
      {
        icon: ScanFace,
        label: "Registro ponto",
        href: "/check-in",
        isPrincipal: true,
        roles: ["ADMIN", "OWNER", "MANAGER", "EMPLOYEE"],
      },
      {
        icon: CircleCheckBig,
        label: "Pedidos",
        href: "/requests",
        roles: ["ADMIN", "OWNER", "MANAGER", "EMPLOYEE"],
      },
      {
        icon: BarChart3,
        label: "Relatórios",
        href: "/reports",
        isOnlySideNavigation: true,
        roles: ["ADMIN", "OWNER", "MANAGER"],
      },
    ],
  },

  {
    title: "Administração",
    items: [
      {
        icon: User,
        label: "Perfil",
        href: "/profile",
        isOnlyBottomNavigation: true,
        roles: ["ADMIN", "OWNER", "MANAGER", "EMPLOYEE"],
      },
      {
        icon: Users,
        label: "Colaboradores",
        href: "/users",
        isOnlySideNavigation: true,
        roles: ["ADMIN", "OWNER", "MANAGER"],
      },
      {
        icon: CalendarClock,
        label: "Jornadas",
        href: "/work-schedules",
        isOnlySideNavigation: true,
        roles: ["ADMIN", "OWNER"],
      },
      {
        icon: Building2,
        label: "Departamentos",
        href: "/departments",
        isOnlySideNavigation: true,
        roles: ["ADMIN", "OWNER"],
      },
      {
        icon: MapPin,
        label: "Localizações",
        href: "/locations",
        isOnlySideNavigation: true,
        roles: ["ADMIN", "OWNER"],
      },

      {
        icon: Settings,
        label: "Configurações",
        href: "/settings",
        isOnlySideNavigation: true,
        roles: ["ADMIN", "OWNER"],
      },
    ],
  },
];

export const menuItems = groupedMenusItems.map((group) => group.items).flat();

export function MainNavigation({ children }: MainNavigationProps) {
  const { isLargeScreen } = useScreenSize();

  return (
    <div className="min-h-screen">
      <div className="lg:hidden">
        <div className="flex items-center justify-center border-b border-gray-200  px-4 py-4 bg-[#1b1917] ">
          <div className="flex items-center">
            <img src="/assets/logo-short.png" alt="logo" className="h-7 mr-2" />
            <span className="text-lg font-bold text-white">
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
