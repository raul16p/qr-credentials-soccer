"use client";
import registrarse from "@/actions/register";
import React from "react";
import { useFormStatus } from "react-dom";

const Register = () => {
  const { pending } = useFormStatus();

  return (
    <div>
      <h1 className="text-lg font-bold">Página de registro</h1>
      <form action={registrarse}>
        <label htmlFor="name">Nombre completo: </label>
        <input
          type="text"
          name="nombre"
          min={5}
          max={150}
          required
          className="border-2"
        />
        <br />

        <label htmlFor="name">Nombre de usuario: </label>
        <input
          type="text"
          name="username"
          min={5}
          max={150}
          required
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
          className="border-2"
        />
        <br />

        <button
          type="submit"
          aria-disabled={pending}
          className="border-green-500 border-2"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
