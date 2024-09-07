import { Tarjeta } from "@/interfaces/tarjeta.interface";
import TarjetasPage from "./components/TarjetasPage";
import { cookies } from "next/headers";

const getData = async (): Promise<{ tarjetas: Tarjeta[]; items: number }> => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const response = await fetch("http://localhost:8080/api/tarjetas/all", {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const data = await response.json();
  return data;
};

export default async function Page() {
  const data = await getData();

  return (
    <div className="flex flex-col gap-8 w-full h-full">
      <TarjetasPage data={data} />
    </div>
  );
}
