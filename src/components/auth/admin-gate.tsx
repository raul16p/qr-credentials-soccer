"use client";

import { FormError } from "@/components/form-error";
import { useAdmin } from "@/hooks/use-current-user";

interface AdminGateProps {
  children: React.ReactNode;
}

export const AdminGate = ({ children }: AdminGateProps) => {
  const isAdmin = useAdmin();

  if (!isAdmin) {
    return <FormError message="No tienes permiso de acceder a esta ruta" />;
  }

  return <>{children}</>;
};
