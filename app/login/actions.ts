"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const cookiesStore = cookies();
  const response = await fetch(`${process.env.API_HOST}:${process.env.API_PORT}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
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

  redirect("/gastos-mensuales");
}
