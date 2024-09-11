import { type Gasto } from "@/interfaces/gasto.interface";
import { Metadata } from "next";
import Table from "./components/gastos-table/Table";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Gastos Mensuales",
  description: "Registro de tus gastos mensuales",
};

interface RequestParams {
  searchParams: {
    month?: string;
    year?: string;
  };
}

const fetchGastos = async (
  url: string,
  token: string
): Promise<{ gastos: Gasto[]; items: number }> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al cargar los gastos");
  }

  return response.json();
};

const getData = async (
  request: RequestParams
): Promise<{ gastos: Gasto[]; items: number }> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const { month, year } = request.searchParams;
  const baseUrl = `${process.env.API_URI}/api/gastos/all`;

  const url =
    month && year ? `${baseUrl}?month=${month}&year=${year}` : baseUrl;

  return await fetchGastos(url, token?.value || "");
};

export default async function Page(request: any) {
  const data = await getData(request);

  return (
    <main className="flex flex-col gap-3 w-full h-full">
      <Table data={data} />
    </main>
  );
}
