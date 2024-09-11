"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createServicio(formData: FormData) {
  const token = cookies().get("token");
  const response = await fetch(
    `${process.env.API_URI}/api/servicios/create`,
    {
      method: "POST",
      body: JSON.stringify({
        title: formData.get("title"),
        value: Number(formData.get("value")),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  revalidatePath("/servicios");

  if (!response.ok) {
    return {
      error: "Error al crear el servicio",
    };
  }
}

export async function deleteServicios(id: string) {
  const token = cookies().get("token");
  const response = await fetch(
    `${process.env.API_URI}/api/servicios/${id}/delete`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  revalidatePath("/servicios");

  if (!response.ok) {
    return {
      error: "Error al eliminar el servicio",
    };
  }
}

export async function updateServicio(
  id: string,
  updatedServicio: Record<string, any>
) {
  const token = cookies().get("token");
  const response = await fetch(
    `${process.env.API_URI}/api/servicios/${id}/update`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedServicio),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  revalidatePath("/servicios");

  if (!response.ok) {
    return {
      error: "Error al actualizar el servicio",
    };
  }
}
