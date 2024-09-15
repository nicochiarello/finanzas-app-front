"use client";

import { createCuota } from "../../actions";
import CreateButton from "./CreateButton";
import toast from "react-hot-toast";

import { OptimisticCuota } from "../CuotasPage";
import { Tarjeta } from "@/interfaces/tarjeta.interface";
import { tarjetaHandler } from "@/app/(dashboard)/tarjetas/components/TarjetasPage";

const CreatePopup = ({
  onClose,
  addOptimistic,
  tarjetas,
}: {
  onClose: () => void;
  tarjetas: Tarjeta[];
  addOptimistic: (cuota: OptimisticCuota) => void;
}) => {
  return (
    <div className="w-full h-full popup-container-bg absolute z-10 top-0 left-0 flex items-center justify-center">
      <div className="w-[45rem] h-[35rem] flex flex-col bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Agregar Cuota</h2>
          <button onClick={onClose} className="text-xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-1 w-full p-4">
          <form
            action={async (formData: FormData) => {
              const response = await createCuota(formData);

              if (response?.error) {
                toast.error(response.error);
                onClose();
                return;
              } else {
                addOptimistic({
                  _id: Math.random().toString(),
                  optimistic: true,
                  title: formData.get("title") as string,
                  value: Number(formData.get("value")),
                  paid: Number(formData.get("paid")),
                  qty: Number(formData.get("qty")),
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
              }

              onClose();
            }}
            className="flex flex-col justify-between w-full"
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                required
                placeholder="Título"
                className="p-2 border rounded-lg"
              />
              <input
                type="number"
                name="value"
                required
                placeholder="Valor"
                className="p-2 border rounded-lg"
              />
              <input
                type="number"
                name="paid"
                required
                placeholder="Cuotas pagas"
                className="p-2 border rounded-lg"
              />
              <input
                type="number"
                name="qty"
                required
                placeholder="Cuotas totales"
                className="p-2 border rounded-lg"
              />
              <select name="card" className="p-2 border rounded-lg">
                {tarjetas.map((tarjeta) => (
                  <option key={tarjeta._id} value={tarjeta._id}>
                    {`${tarjetaHandler(tarjeta.brand)} ${tarjeta.entity}`}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="createdAt"
                placeholder="Fecha"
                className="p-2 border rounded-lg"
              />
            </div>
            <CreateButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePopup;
