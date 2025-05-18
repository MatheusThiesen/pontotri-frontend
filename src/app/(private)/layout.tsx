import { MainNavigation } from "@/components/navigation/main-navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio | PontoTRI",
  description: "Pagina de inicial",
};

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainNavigation>{children}</MainNavigation>;
}
