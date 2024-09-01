import { Metadata } from "next";
import { Tarjeta } from "@/interfaces/tarjeta.interface";
import { Cuota } from "@/interfaces/cuota.interface";
import CuotasPage from "./components/CuotasPage";

export const metadata: Metadata = {
  title: "Cuotas",
  description: "Registro de tus cuotas de tarjeta de crédito",
};

async function getData(): Promise<{ tarjetas: Tarjeta[]; cuotas: Cuota[] }> {
  const getTarjetas = fetch("http://localhost:8080/api/tarjetas/all");
  const getCuotas = fetch("http://localhost:8080/api/cuotas/all");

  const [tarjetas, cuotas] = await Promise.all([getTarjetas, getCuotas]);

  const data = await Promise.all([tarjetas.json(), cuotas.json()]);

  return {
    tarjetas: data[0].tarjetas,
    cuotas: data[1].cuotas,
  };
}

export default async function Page() {
  const data = await getData();
  console.log(data)

  return (
    <main className="flex flex-col gap-8 w-full h-full">
      <CuotasPage data={data} />
    </main>
  );
}
