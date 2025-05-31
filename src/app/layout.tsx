import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/contexts/AuthProvider";
import { ReactQueryProvider } from "@/lib/services/react-query";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PontoTRI",
  description: "PontoTRI - Controle de ponto e jornada de trabalho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning data-lt-installed="true">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <AuthProvider>
            {children}

            <Toaster richColors position="top-center" theme="light" />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
