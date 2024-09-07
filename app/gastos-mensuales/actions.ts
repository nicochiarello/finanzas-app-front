"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const token = cookies().get("token");

export async function createGasto(formData: FormData) {
  const response = await fetch("http://localhost:8080/api/gastos/create", {
    method: "POST",
    body: JSON.stringify({
      title: formData.get("title"),
      value: Number(formData.get("value")),
      createdAt: formData.get("date"),
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token?.value}`,
    },
  });

  revalidatePath("/gastos-mensuales");

  if (!response.ok) {
    console.log(response)
    return {
      error: "Error al crear el gasto",
    };
  }
}

export async function deleteGasto(id: string) {
  const response = await fetch(
    `http://localhost:8080/api/gastos/${id}/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  revalidatePath("/gastos-mensuales");

  if (!response.ok) {
    return {
      error: "Error al eliminar el gasto",
    };
  }
}

export async function updateGasto(
  id: string,
  updatedGasto: Record<string, any>
) {
  const response = await fetch(
    `http://localhost:8080/api/gastos/${id}/update`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedGasto),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  revalidatePath("/gastos-mensuales");

  if (!response.ok) {
    return {
      error: "Error al actualizar el gasto",
    };
  }
}
