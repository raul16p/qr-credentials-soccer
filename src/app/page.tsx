import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main>
      Bienvenido
      <nav className="">
        <h1 className="text-xl font-bold">NextAuth</h1>
        <div className="">
          <ul className="flex gap-x-2">
            {!session?.user ? (
              <>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/auth/login">Login</Link>
                </li>
                <li>
                  <Link href="/auth/register">Registrarse</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/api/auth/signout">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </main>
  );
}
