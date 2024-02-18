import { FormError } from "@/components/form-error";
import { currentUser } from "@/lib/auth-utils";

interface AdminGateProps {
  children: React.ReactNode;
}

export const AdminGate = async ({ children }: AdminGateProps) => {
  const user = await currentUser();

  if (!user?.isAdmin) {
    return <FormError message="No tienes permiso de acceder a esta ruta" />;
  }

  return <>{children}</>;
};
