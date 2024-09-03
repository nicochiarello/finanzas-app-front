import ServiciosPage from "./components/ServiciosPage";
import { Servicio } from "@/interfaces/servicio.interface";

const getData = async (
  request: any
): Promise<{ servicios: Servicio[]; items: number }> => {
  const { month } = request.searchParams;
  const { year } = request.searchParams;

  if (month && year) {
    const response = await fetch(
      `http://localhost:8080/api/servicios/all?month=${month}&year=${year}`,
      {
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  }

  const response = await fetch("http://localhost:8080/api/servicios/all");
  const data = await response.json();

  return data;
};

export default async function Page(request: any) {
  const data = await getData(request);

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <ServiciosPage data={data} />
    </div>
  );
}
