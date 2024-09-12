"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
  const cookiesStore = cookies();
  const password = formData.get("password");
  const repeatPassword = formData.get("repeat-password");

  if (password !== repeatPassword) {
    throw new Error("Las contraseñas no coinciden");
  }
  
  const response = await fetch(`${process.env.API_URI}/api/auth/signup`, {
    method: "POST",
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 201) {
    throw new Error("Error al iniciar sesión");
  }

  const data = await response.json();

  const token = data.access_token;

  cookiesStore.set("token", token);

  redirect("/");
}
