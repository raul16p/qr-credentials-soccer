"use server";
import db from "@/lib/db";
import bcrypt from "bcrypt";

export default async function registrarse(formData: FormData) {
  try {
    const rawData = {
      fullName: formData.get("nombre") as string,
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    const duplicatedUsername = await db.usuario.findFirst({
      where: { username: formData.get("username") as string },
    });

    if (duplicatedUsername) {
      return { message: "El nombre de usuario ya está en uso" };
    }

    const hashedPassword = await bcrypt.hash(rawData.password, 10);

    await db.usuario.create({
      data: {
        nombre: rawData.fullName,
        password: hashedPassword,
        username: rawData.username,
      },
    });
  } catch (error) {
    return { error };
  }
}
