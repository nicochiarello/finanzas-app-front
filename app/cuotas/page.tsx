import { Metadata } from "next";
import { Tarjeta } from "@/interfaces/tarjeta.interface";
import { Cuota } from "@/interfaces/cuota.interface";
import CuotasPage from "./components/CuotasPage";

export const metadata: Metadata = {
  title: "Cuotas",
  description: "Registro de tus cuotas de tarjeta de crédito",
};

async function getData(
  request: any
): Promise<{ tarjetas: Tarjeta[]; cuotas: Cuota[] }> {
  const { month } = request.searchParams;
  const { year } = request.searchParams;
  const { card } = request.searchParams;

  let getCuotas;

  if (month && year && card) {
    getCuotas = fetch(
      `http://localhost:8080/api/cuotas/all?month=${month}&year=${year}&card=${card}`,
      {
        cache: "no-store",
      }
    );
  } else if (month && year) {
    getCuotas = fetch(
      `http://localhost:8080/api/cuotas/all?month=${month}&year=${year}`,
      {
        cache: "no-store",
      }
    );
  } else if (card) {
    getCuotas = fetch(`http://localhost:8080/api/cuotas/all?card=${card}`, {
      cache: "no-store",
    });
  } else {
    getCuotas = fetch("http://localhost:8080/api/cuotas/all", {
      cache: "no-store",
    });
  }

  const getTarjetas = fetch("http://localhost:8080/api/tarjetas/all");

  const [tarjetas, cuotas] = await Promise.all([getTarjetas, getCuotas]);

  const data = await Promise.all([tarjetas.json(), cuotas.json()]);

  return {
    tarjetas: data[0].tarjetas,
    cuotas: data[1].cuotas,
  };
}

export default async function Page(request: any) {
  const data = await getData(request);

  return (
    <main className="flex flex-col gap-3 w-full h-full">
      <CuotasPage data={data} />
    </main>
  );
}
