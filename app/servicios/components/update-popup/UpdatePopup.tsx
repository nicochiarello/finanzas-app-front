"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { updateServicio } from "../../actions";
import UpdateButton from "./UpdateButton";
import { Servicio } from "@/interfaces/servicio.interface";

const UpdatePopup = ({
  updateOptimistic,
  servicio,
  onClose,
}: {
  updateOptimistic: (servicio: Servicio) => void;
  servicio: Servicio;
  onClose: () => void;
}) => {
  const [data, setData] = useState<Servicio>(servicio);

  return (
    <div className="w-full h-full popup-container-bg absolute top-0 left-0 flex items-center justify-center">
      <div className="w-[45rem] h-[35rem] flex flex-col bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Actualizar Servicio</h2>
          <button onClick={onClose} className="text-xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-1 w-full p-4">
          <form
            className="flex flex-col justify-between w-full"
            action={async () => {
              updateOptimistic(data);
              const response = await updateServicio(servicio._id, data);

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
                id="title"
                type="text"
                value={data.title}
                className="p-2 border rounded-lg"
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />

              <input
                id="value"
                type="number"
                value={data.value}
                className="p-2 border rounded-lg"
                onChange={(e) => setData({ ...data, value: +e.target.value })}
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
