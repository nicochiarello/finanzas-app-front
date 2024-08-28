import { type Gasto } from "@/interfaces/gasto.interface";

const getData = async (): Promise<{ gastos: Gasto[]; items: number }> => {
  const response = await fetch("http://localhost:8080/api/gastos/all", {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function Page() {
  await sleep(1000);
  const data = await getData();
  console.log(data);
  return (
    <div className="flex w-full h-full bg-white rounded-xl">
    {/* table */}
    <table className="table-auto w-full text-left h-fit">
      <thead className="border-b-2 border-gray-200">
        <tr>
          <th className="px-4 py-2">Fecha</th>
          <th className="px-4 py-2">Concepto</th>
          <th className="px-4 py-2">Monto</th>
          <th className="px-4 py-2 text-right">Acciones</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 font-medium">
        {data.gastos.map((gasto) => (
          <tr key={gasto._id.$oid}>
            <td className="px-4 py-6  border-y border-gray-300">{
              new Date(gasto.createdAt).toLocaleDateString('es-Ar')
              }</td>
            <td className="px-4 py-6  border-y border-gray-300">{gasto.title}</td>
            <td className="px-4 py-6  border-y border-gray-300">${gasto.value}</td>
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
