import { User } from "next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import qrcode from "qrcode";
import Link from "next/link";

interface UserInfoProps {
  user: User;
  label: string;
}

export const UserInfo = async ({ user, label }: UserInfoProps) => {
  let URL_QR = "";
  if (!user.isAdmin) {
    try {
      URL_QR = await qrcode.toDataURL(user.username, {
        version: 5,
        width: 300,
      });
    } catch (err) {}
  }

  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Nombre completo</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user.nombre}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Nombre de usuario</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user.username}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Rol</p>
          <p className="truncate text-xs max-w-[180px] font-mono p-1 bg-slate-100 rounded-md">
            {user.isAdmin ? "Administrador" : "Jugador de fútbol"}
          </p>
        </div>
        {user.isAdmin ? (
          <Link href={"/partidos"}>Administrar partidos</Link>
        ) : (
          <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
            <p className="text-sm font-medium">Código QR de Jugador</p>
            <p className="text-xs max-w-[300px] font-mono p-1 bg-slate-100 rounded-md">
              {URL_QR !== "" ? (
                <Image src={URL_QR} alt="Código QR" width={300} height={300} />
              ) : (
                "No se pudo generar tú código QR"
              )}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
