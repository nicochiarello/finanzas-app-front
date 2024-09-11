import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Balance",
  description: "Balance general de tus finanzas",
};

export default function Home() {
  return (
    <main className="flex flex-col gap-8 w-full h-full">
      <div className="w-full flex justify-between items-center h-fit">
        <div>
          <h1 className="text-2xl font-bold">Balance</h1>
          <p className="text-lg">Balance general de tus finanzas</p>
        </div>
        <div className="px-12 py-4 rounded-xl shadow-xl font-medium bg-indigo-500 text-white">
          Agregar
        </div>
      </div>
      <div className="flex flex-1 bg-white rounded-xl shadow-xl">

      </div>
    </main>
  );
}
