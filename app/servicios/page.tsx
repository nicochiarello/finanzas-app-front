import ServiciosPage from "./components/ServiciosPage";
import { Servicio } from "@/interfaces/servicio.interface";

const getData = async (): Promise<{ servicios: Servicio[]; items: number }> => {
  const response = await fetch("http://localhost:8080/api/servicios/all");
  const data = await response.json();
  return data;
};

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const data = await getData();

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <ServiciosPage data={data} />
    </div>
  );
}
