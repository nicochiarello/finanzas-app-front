import { cookies } from "next/headers";
import ServiciosPage from "./components/ServiciosPage";
import { Servicio } from "@/interfaces/servicio.interface";

export const metadata = {
  title: "Servicios",
  description: "Gestiona tus servicios",
  icons: {
    icon: "/favicon.png",
  },
};

interface RequestParams {
  searchParams: {
    month?: string;
    year?: string;
  };
}

const fetchServicios = async (
  url: string,
  token: string
): Promise<{ servicios: Servicio[]; items: number }> => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Error al cargar los servicios");
  }

  return response.json();
};

const getData = async (
  request: RequestParams
): Promise<{ servicios: Servicio[]; items: number }> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  const { month, year } = request.searchParams;
  const baseUrl = `${process.env.API_URI}/api/servicios/all`;

  const url =
    month && year ? `${baseUrl}?month=${month}&year=${year}` : baseUrl;

  return await fetchServicios(url, token?.value || "");
};

export default async function Page(request: any) {
  const data = await getData(request);

  return (
    <div className="flex flex-col gap-3 w-full h-full">
      <ServiciosPage data={data} />
    </div>
  );
}
