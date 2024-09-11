"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createTarjeta(formData: FormData) {
  const token = cookies().get("token");
  const response = await fetch("http://localhost:8080/api/tarjetas/create", {
    method: "POST",
    body: JSON.stringify({
      brand: Number(formData.get("brand")),
      entity: formData.get("entity"),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  revalidatePath("/tarjetas");

  if (!response.ok) {
    return {
      error: "Error al crear la tarjeta",
    };
  }
}

export async function deleteTarjeta(id: string) {
  const token = cookies().get("token");
  const response = await fetch(
    `http://localhost:8080/api/tarjetas/${id}/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  revalidatePath("/tarjetas");

  if (!response.ok) {
    return {
      error: "Error al eliminar la tarjeta",
    };
  }
}

export async function updateTarjeta(
  id: string,
  updatedTarjeta: Record<string, any>
) {
  const token = cookies().get("token");
  const response = await fetch(
    `http://localhost:8080/api/tarjetas/${id}/update`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedTarjeta),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  revalidatePath("/tarjetas");

  if (!response.ok) {
    return {
      error: "Error al actualizar la tarjeta",
    };
  }
}
