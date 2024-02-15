"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";

const Register = () => {
  const searchParams = useSearchParams();
  const { pending } = useFormStatus();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const sourceParam = searchParams.get("source");

  async function onSubmit() {
    const res = await signIn("credentials", {
      username: formData.username,
      password: formData.password,
      redirect: false,
    });

    console.log(res);

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      <h1 className="font-bold text-lg">Página de inicio de sesión</h1>
      {sourceParam === "register" && (
        <p>Te has registrado correctamente. Ahora inicia sesión</p>
      )}
      <form action={onSubmit}>
        <label htmlFor="name">Nombre de usuario: </label>
        <input
          type="text"
          name="username"
          min={5}
          max={30}
          required
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, username: e.target.value }))
          }
          className="border-2"
        />
        <br />

        <label htmlFor="name">Contraseña: </label>
        <input
          type="password"
          name="password"
          min={8}
          max={150}
          required
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          className="border-2"
        />
        <br />

        <button
          type="submit"
          aria-disabled={pending}
          className="border-green-500 border-2"
        >
          Iniciar sesión
        </button>
      </form>
      {error !== "" && <p>Error: {error}</p>}
    </div>
  );
};

export default Register;
