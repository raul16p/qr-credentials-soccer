import Link from "next/link";
import { currentUser } from "@/lib/auth-utils";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="p-10">
      <nav className="">
        <h1 className="text-xl font-bold py-3">Título de la App</h1>
        <div className="">
          <ul className="flex gap-x-2">
            {!user ? (
              <>
                <li>
                  <Link href="/">
                    <Button>Home</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login">
                    <Button>Login</Button>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register">
                    <Button>Registrarse</Button>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link href="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </main>
  );
}
