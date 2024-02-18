"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserNavBar = () => {
  const pathname = usePathname();
  return (
    <>
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
    </>
  );
};

export default UserNavBar;
