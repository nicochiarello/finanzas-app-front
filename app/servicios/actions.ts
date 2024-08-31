"use server";

import { revalidatePath } from "next/cache";

export async function createServicio(formData: FormData) {
  const response = await fetch("http://localhost:8080/api/servicios/create", {
    method: "POST",
    body: JSON.stringify({
      title: formData.get("title"),
      value: formData.get("value"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  revalidatePath("/servicios");

  if (!response.ok) {
    return {
      error: "Error al crear el servicio",
    };
  }
}

export async function deleteServicios(id: string) {
  const response = await fetch(
    `http://localhost:8080/api/servicios/${id}/delete`,
    {
      method: "DELETE",
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
  const response = await fetch(
    `http://localhost:8080/api/servicios/${id}/update`,
    {
      method: "PATCH",
      body: JSON.stringify(updatedServicio),
      headers: {
        "Content-Type": "application/json",
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
