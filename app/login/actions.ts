"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function login(formData: FormData) {
  const cookiesStore = cookies();
  const response = await fetch(`${process.env.API_URI}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email: formData.get("email"),
      password: formData.get("password"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();

  if (response.status !== 201) {
    throw new Error(JSON.stringify(jsonResponse));
  }

  const token = jsonResponse.access_token;

  cookiesStore.set("token", token);

  redirect("/gastos-mensuales");
}
