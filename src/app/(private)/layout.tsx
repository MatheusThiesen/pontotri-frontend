import { MainNavigation } from "@/components/main-navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | Analytic Alpar do Brasil",
  description: "Pagina de inicial",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainNavigation>{children}</MainNavigation>;
}
