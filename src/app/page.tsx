import Link from "next/link";
import { currentUser } from "@/lib/auth-utils";

export default async function Home() {
  const user = await currentUser();

  return (
    <main>
      <nav className="">
        <h1 className="text-xl font-bold">Título de la App</h1>
        <div className="">
          <ul className="flex gap-x-2">
            {!user ? (
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
              </>
            )}
          </ul>
        </div>
      </nav>
    </main>
  );
}
