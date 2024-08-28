import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gastos Mensuales",
  description: "Registro de tus gastos mensuales",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col gap-8 w-full h-full">
      <div className="w-full flex justify-between items-center h-fit">
        <div>
          <h1 className="text-2xl font-bold">{metadata.title as string}</h1>
          <p className="text-lg">{metadata.description as string}</p>
        </div>
        <div className="px-12 py-4 rounded-xl shadow-xl font-medium bg-indigo-500 text-white">
          Agregar
        </div>
      </div>
      <div className="flex flex-1 bg-white rounded-xl shadow-xl overflow-y-scroll">
        {children}
      </div>
    </main>
  );
}
