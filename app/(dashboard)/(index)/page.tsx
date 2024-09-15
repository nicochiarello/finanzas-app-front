import { Metadata } from "next";
import { FaRegCreditCard, FaRegCalendarCheck } from "react-icons/fa";
import Chart from "./components/Chart";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Balance",
  description: "Balance general de tus finanzas",
};

const getData = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const response = await fetch(`${process.env.API_URI}/api/balances/mine`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const data = await response.json();
  return data;
};

export default async function Home() {
  const data = await getData();
  const getCurrentMonth = () => {
    const month = new Date().toLocaleString("es-Ar", {
      month: "long",
    });
    return month[0].toUpperCase() + month.slice(1);
  };
  return (
    <main className="flex flex-col gap-8 w-full h-full">
      <div className="w-full flex justify-between items-center h-fit">
        <div>
          <h1 className="text-2xl font-bold">Balance</h1>
          <p className="text-lg">Balance general de tus finanzas</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col rounded-xl">
        <div className="flex-1 flex flex-col rounded-xl mb-3 bg-white">
          <div className="p-2 md:p-4">
            <h3 className="text-xl font-semibold">Gastos mensuales</h3>
          </div>
          <div className="flex-1 py-4">
            <Chart data={data} />
          </div>
        </div>
        <div className="flex gap-8 h-[14rem] w-full">
          <Link
            href={"/cuotas"}
            className="w-[26rem] h-full bg-white rounded-xl flex flex-col items-center"
          >
            <div className="flex w-full justify-between items-center border-b">
              <h5 className="font-semibold p-2">
                Cuotas de {getCurrentMonth()}
              </h5>
              <div className="px-2">
                <FaRegCreditCard className="text-xl" />
              </div>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <p className="font-semibold text-2xl">${data.cuotas.total}</p>
            </div>
          </Link>
          <Link
            href={"/servicios"}
            className="w-[26rem] h-full bg-white rounded-xl flex flex-col items-center"
          >
            <div className="flex w-full justify-between items-center border-b">
              <h5 className="font-semibold p-2">
                Servicios de {getCurrentMonth()}
              </h5>
              <div className="px-2">
                <FaRegCalendarCheck className="text-xl" />
              </div>
            </div>
            <div className="flex flex-1 justify-center items-center">
              <p className="font-semibold text-2xl">${data.servicios.total}</p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
