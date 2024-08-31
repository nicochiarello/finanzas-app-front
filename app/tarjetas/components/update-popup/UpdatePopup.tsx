"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateTarjeta } from "../../actions";
import UpdateButton from "./UpdateButton";
import { Tarjeta } from "@/interfaces/tarjeta.interface";

const UpdatePopup = ({
  updateOptimistic,
  tarjeta,
  onClose,
}: {
  updateOptimistic: (tarjeta: Tarjeta) => void;
  tarjeta: Tarjeta;
  onClose: () => void;
}) => {
  const [data, setData] = useState<Tarjeta>(tarjeta);

  return (
    <div className="w-full h-full popup-container-bg absolute top-0 left-0 flex items-center justify-center">
      <div className="w-[45rem] h-[35rem] flex flex-col bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Actualizar Tarjeta</h2>
          <button onClick={onClose} className="text-xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-1 w-full p-4">
          <form
            className="flex flex-col justify-between w-full"
            action={async () => {
              updateOptimistic(data);
              const response = await updateTarjeta(tarjeta._id, data);

              if (response?.error) {
                toast.error(response.error);
                onClose();
                return;
              }

              onClose();
            }}
          >
            <div className="flex flex-col gap-4">
              <select
                name="brand"
                value={data.brand}
                required
                onChange={(e) => setData({ ...data, brand: +e.target.value })}
                className="p-2 border rounded-lg"
              >
                <option value="0">Visa</option>
                <option value="1">Mastercard</option>
                <option value="2">American Express</option>
              </select>

              <input
                value={data.entity}
                type="string"
                placeholder="Banco"
                onChange={(e) => setData({ ...data, entity: e.target.value })}
                name="entity"
                required
                className="p-2 border rounded-lg"
              />
            </div>
            <UpdateButton />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePopup;
