import Image from "next/image";
import qrcode from "qrcode";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

async function Dashboard() {
  let generatedQR = "";
  const session = await getServerSession(authOptions);

  if (!session?.user) return <p>No autorizado</p>;

  try {
    generatedQR = await qrcode.toDataURL(session.user.username);
  } catch (error) {
    generatedQR = "";
  }

  return (
    <section>
      <div>
        <h1 className="text-5xl">Dashboard</h1>
        <p>
          Bienvenido {session.user.nombre}. Tu username es{" "}
          {session.user.username}
        </p>
        <div className="text-blue-500">
          <h3>Mi código QR</h3>

          {generatedQR !== "" ? (
            <Image src={generatedQR} alt="Código QR" width={200} height={200} />
          ) : (
            <p>No se pudo generar el código QR</p>
          )}
        </div>
      </div>
    </section>
  );
}
export default Dashboard;
