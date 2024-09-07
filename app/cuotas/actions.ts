"use server";

import { revalidatePath } from "next/cache";

export async function createCuota(formData: FormData) {
  const response = await fetch("http://localhost:8080/api/cuotas/create", {
    method: "POST",
    body: JSON.stringify({
      card: formData.get("card"),
      title: formData.get("title"),
      value: formData.get("value"),
      paid: Number(formData.get("paid")),
      qty: Number(formData.get("qty")),
      createdAt: formData.get("createdAt"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidatePath("/cuotas");

  if (!response.ok) {
    return {
      error: "Error al crear la cuota",
    };
  }
}

export async function deleteCuota(id: string) {
  const response = await fetch(
    `http://localhost:8080/api/cuotas/${id}/delete`,
    {
      method: "DELETE",
    }
  );

  revalidatePath("/cuotas");

  if (!response.ok) {
    return {
      error: "Error al eliminar la cuota",
    };
  }
}

export async function updateCuota(
  id: string,
  updatedCuota: Record<string, any>
) {
  const response = await fetch(
    `http://localhost:8080/api/cuotas/${id}/update`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedCuota),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  revalidatePath("/cuotas");

  if (!response.ok) {
    return {
      error: "Error al actualizar la cuota",
    };
  }
}
