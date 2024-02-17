import { AdminGate } from "@/components/auth/admin-gate";
import { FormSuccess } from "@/components/form-success";
import { Card } from "@/components/ui/card";

const AdministrarPartidos = () => {
  return (
    <Card className="w-[600px]">
      <AdminGate>
        <FormSuccess message="Eres administrador y puedes crear partidos" />
      </AdminGate>
    </Card>
  );
};

export default AdministrarPartidos;
