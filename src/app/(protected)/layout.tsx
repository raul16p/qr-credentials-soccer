"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/auth/user-button";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const pathname = usePathname();
  return (
    <div className="h-full w-full flex flex-col gap-y-10 items-center justify-center">
      <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
        <div className="flex gap-x-2">
          <Button
            asChild
            variant={pathname === "/dashboard" ? "default" : "outline"}
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button
            asChild
            variant={pathname === "/partidos" ? "default" : "outline"}
          >
            <Link href="/partidos">Administrar partidos</Link>
          </Button>
        </div>
        <UserButton />
      </nav>
      {children}
    </div>
  );
};

export default ProtectedLayout;
