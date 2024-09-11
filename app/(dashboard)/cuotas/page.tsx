import { Metadata } from "next";
import { Tarjeta } from "@/interfaces/tarjeta.interface";
import { Cuota } from "@/interfaces/cuota.interface";
import CuotasPage from "./components/CuotasPage";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Cuotas",
  description: "Registro de tus cuotas de tarjeta de crédito",
};

interface RequestParams {
  searchParams: {
    month?: string;
    year?: string;
    card?: string;
  };
}

const fetchCuotas = async (
  url: string,
  token: string
): Promise<{ cuotas: Cuota[]; items: number }> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al cargar las cuotas");
  }

  return response.json();
};

const fetchTarjetas = async (
  token: string
): Promise<{ tarjetas: Tarjeta[]; items: number }> => {
  const response = await fetch(
    `${process.env.API_URI}/api/tarjetas/all`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Error al cargar las cuotas");
  }

  return response.json();
};

const getData = async (
  request: RequestParams
): Promise<{
  cuotas: Cuota[];
  tarjetas: Tarjeta[];
}> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const { month, year, card } = request.searchParams;
  const baseUrl = `${process.env.API_URI}/api/cuotas/all`;

  const auxUrl =
    month && year ? `${baseUrl}?month=${month}&year=${year}` : baseUrl;

  const url = card
    ? `${auxUrl}${auxUrl.includes("?") ? "&" : "?"}card=${card}`
    : auxUrl;

  const cuotas = await fetchCuotas(url, token?.value || "");
  const tarjetas = await fetchTarjetas(token?.value || "");

  return { cuotas: cuotas.cuotas, tarjetas: tarjetas.tarjetas };
};

export default async function Page(request: any) {
  const data = await getData(request);

  return (
    <main className="flex flex-col gap-3 w-full h-full">
      <CuotasPage data={data} />
    </main>
  );
}
