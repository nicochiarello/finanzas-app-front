import { type Cuota } from "@/interfaces/cuota.interface";

const getData = async (): Promise<{ cuotas: Cuota[]; items: number }> => {
  const response = await fetch("http://localhost:8080/api/cuotas/all", {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Page() {
  await sleep(1000);
  const data = await getData();

  return (
    <div className="flex w-full h-full bg-white rounded-xl">
      {/* table */}
      <table className="table-auto w-full text-left h-fit">
        <thead className="border-b-2 border-gray-200">
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Concepto</th>
            <th className="px-4 py-2">Cantidad de cuotas</th>
            <th className="px-4 py-2">Pagadas</th>
            <th className="px-4 py-2">Restantes</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 font-medium">
          {data.cuotas.map((cuota) => (
            <tr key={cuota._id.$oid}>
              <td className="px-4 py-6  border-y border-gray-300">
                {new Date(cuota.createdAt).toLocaleDateString('es-Ar')}
              </td>
              <td className="px-4 py-6  border-y border-gray-300">
                {cuota.title}
              </td>
              <td className="px-4 py-6  border-y border-gray-300">
                {cuota.value}
              </td>
              <td className="px-4 py-6  border-y border-gray-300">
                {cuota.paid}
              </td>
              <td className="px-4 py-6  border-y border-gray-300">
                {cuota.remaining}
              </td>
              <td className="px-4 py-6 text-right  border-y border-gray-300">
                <button className="mr-2 text-sm">Editar</button>
                <button className="text-sm">Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
