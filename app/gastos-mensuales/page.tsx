import { type Gasto } from "@/interfaces/gasto.interface";

import { Metadata } from "next";
import Table from "./components/gastos-table/Table";

export const metadata: Metadata = {
  title: "Gastos Mensuales",
  description: "Registro de tus gastos mensuales",
};

async function getData(): Promise<{ gastos: Gasto[]; items: number }> {
  const response = await fetch("http://localhost:8080/api/gastos/all");
  const data = await response.json();
  return data;
}

export default async function Page() {
  const data = await getData();

  return (
    <main className="flex flex-col gap-8 w-full h-full">
      <Table data={data} />
    </main>
  );
}
