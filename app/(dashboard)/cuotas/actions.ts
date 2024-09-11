"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createCuota(formData: FormData) {
  const token = cookies().get("token");
  const response = await fetch(
    `${process.env.API_HOST}:${process.env.API_PORT}/api/cuotas/create`,
    {
      method: "POST",
      body: JSON.stringify({
        card: formData.get("card"),
        title: formData.get("title"),
        value: Number(formData.get("value")),
        paid: Number(formData.get("paid")),
        qty: Number(formData.get("qty")),
        createdAt: formData.get("createdAt") || new Date().toISOString(),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  revalidatePath("/cuotas");

  if (!response.ok) {
    return {
      error: "Error al crear la cuota",
    };
  }
}

export async function deleteCuota(id: string) {
  const token = cookies().get("token");
  const response = await fetch(
    `${process.env.API_HOST}:${process.env.API_PORT}/api/cuotas/${id}/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
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
  const body = {
    card: updatedCuota.card._id,
    title: updatedCuota.title,
    value: updatedCuota.value,
    paid: updatedCuota.paid,
    qty: updatedCuota.qty,
  };
  const token = cookies().get("token");
  const response = await fetch(
    `${process.env.API_HOST}:${process.env.API_PORT}/api/cuotas/${id}/update`,
    {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
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
