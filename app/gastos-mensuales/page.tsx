import { type Gasto } from "@/interfaces/gasto.interface";
import { Metadata } from "next";
import Table from "./components/gastos-table/Table";

export const metadata: Metadata = {
  title: "Gastos Mensuales",
  description: "Registro de tus gastos mensuales",
};

async function getData(request: any): Promise<{ gastos: Gasto[]; items: number }> {
  const { month } = request.searchParams;
  const { year } = request.searchParams;

  if (month && year) {
    const response = await fetch(
      `http://localhost:8080/api/gastos/all?month=${month}&year=${year}`, {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  }

  const response = await fetch("http://localhost:8080/api/gastos/all");
  const data = await response.json();

  return data;
}

export default async function Page(request: any) {
  const data = await getData(request);

  return (
    <main className="flex flex-col gap-3 w-full h-full">
      <Table data={data} />
    </main>
  );
}
