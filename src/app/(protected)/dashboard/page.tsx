import { currentUser } from "@/lib/auth-utils";
import { UserInfo } from "@/components/user-info";

const Dashboard = async () => {
  const user = await currentUser();

  if (!user)
    return (
      <div>No se ha podido cargar la información de usuario de la sesión</div>
    );

  return <UserInfo label="Información personal" user={user} />;
};

export default Dashboard;
