import { Tarjeta } from "@/interfaces/tarjeta.interface";
import TarjetasPage from "./components/TarjetasPage";

const getData = async (): Promise<{ tarjetas: Tarjeta[]; items: number }> => {
  const response = await fetch("http://localhost:8080/api/tarjetas/all");
  const data = await response.json();
  return data;
};

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await getData();

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <TarjetasPage data={data} />
    </div>
  );
}
