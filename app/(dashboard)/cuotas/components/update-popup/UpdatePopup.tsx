"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateCuota } from "../../actions";
import UpdateButton from "./UpdateButton";
import { Tarjeta } from "@/interfaces/tarjeta.interface";
import { Cuota } from "@/interfaces/cuota.interface";
import { tarjetaHandler } from "@/app/(dashboard)/tarjetas/components/TarjetasPage";

const UpdatePopup = ({
  updateOptimistic,
  cuota,
  onClose,
  tarjetas,
}: {
  updateOptimistic: (cuota: Cuota) => void;
  cuota: Cuota;
  tarjetas: Tarjeta[];
  onClose: () => void;
}) => {
  const [data, setData] = useState<Cuota>(cuota);

  return (
    <div className="w-full h-full popup-container-bg absolute z-10 top-0 left-0 flex items-center justify-center">
      <div className="w-[45rem] h-[35rem] flex flex-col bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Actualizar Cuota</h2>
          <button onClick={onClose} className="text-xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-1 w-full p-4">
          <form
            className="flex flex-col justify-between w-full"
            action={async () => {
              updateOptimistic(data);
              const response = await updateCuota(cuota._id, data);

              if (response?.error) {
                toast.error(response.error);
                onClose();
                return;
              }

              onClose();
            }}
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                required
                placeholder="Título"
                className="p-2 border rounded-lg"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />
              <input
                type="number"
                name="value"
                placeholder="Valor"
                className="p-2 border rounded-lg"
                value={data.value}
                onChange={(e) =>
                  setData({ ...data, value: Number(e.target.value) })
                }
              />
              <input
                type="number"
                name="paid"
                placeholder="Cuotas pagas"
                className="p-2 border rounded-lg"
                value={data.paid}
                onChange={(e) =>
                  setData({ ...data, paid: Number(e.target.value) })
                }
              />
              <input
                type="number"
                name="remaining"
                placeholder="Cuotas totales"
                className="p-2 border rounded-lg"
                value={data.qty}
                onChange={(e) =>
                  setData({ ...data, qty: Number(e.target.value) })
                }
              />
              <select
                name="card"
                className="p-2 border rounded-lg"
                value={data.card?._id}
                onChange={(e) =>
                  setData({
                    ...data,
                    card: { _id: e.target.value } as Tarjeta,
                  })
                }
              >
                {tarjetas.map((tarjeta) => (
                  <option key={tarjeta._id} value={tarjeta._id}>
                    {`${tarjetaHandler(tarjeta.brand)} ${tarjeta.entity}`}
                  </option>
                ))}
              </select>
            </div>
            <UpdateButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;
