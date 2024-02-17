import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "auth";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proyecto credenciales QR",
  description:
    "Proyecto de credencialización mediante código QR para partidos de futbol",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="es">
      <SessionProvider session={session}>
        <body className={inter.className}>
          <Toaster />
          {children}
        </body>
      </SessionProvider>
    </html>
  );
}
