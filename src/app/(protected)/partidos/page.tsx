import { AdminGate } from "@/components/auth/admin-gate";
import { FormSuccess } from "@/components/form-success";
import ModalQR from "@/components/qr-code/modal";
import { Card } from "@/components/ui/card";

const AdministrarPartidos = () => {
  return (
    <Card className="w-[600px]">
      {/** Wrap components inside <AdminGate> when it's necessary to be an administrator */}
      <AdminGate>
        <FormSuccess message="Eres administrador y puedes crear partidos" />
        <ModalQR />
      </AdminGate>
    </Card>
  );
};

export default AdministrarPartidos;
