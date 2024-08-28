import { Tarjeta } from "@/interfaces/tarjeta.interface";

const getData = async (): Promise<{ tarjetas: Tarjeta[]; items: number }> => {
  const response = await fetch("http://localhost:8080/api/tarjetas/all", {
    cache: "no-cache",
  });
  const data = await response.json();
  return data;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const tarjetaHandler = (tarjeta: number) => {
  switch (tarjeta) {
    case 0:
      return "VISA";

    case 1:
      return "MASTERCARD";

    case 2:
      return "AMERICAN EXPRESS";

    default:
      return "Error";
  }
};

export default async function Page() {
  await sleep(1000);
  const data = await getData();

  return (
    <div className="flex w-full h-full bg-white rounded-xl">
      {/* table */}
      <table className="table-auto h-fit w-full text-left">
        <thead className="border-b-2 border-gray-200">
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Tarjeta</th>
            <th className="px-4 py-2">Banco</th>
            <th className="px-4 py-2 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 font-medium">
          {data.tarjetas.map((tarjeta) => (
            <tr key={tarjeta._id.$oid}>
              <td className="px-4 py-6 h-fit border-y border-gray-300">
                {new Date(tarjeta.createdAt).toLocaleDateString('es-Ar')}
              </td>
              <td className="px-4 py-6  border-y border-gray-300">
                {
                  tarjetaHandler(tarjeta.brand)
                }
              </td>
              <td className="px-4 py-6  border-y border-gray-300">
                {tarjeta.entity}
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
