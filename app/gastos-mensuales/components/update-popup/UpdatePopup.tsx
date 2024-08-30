"use client";

import { Gasto } from "@/interfaces/gasto.interface";
import { useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { updateGasto } from "../../actions";
import { on } from "events";
import UpdateButton from "./UpdateButton";

const UpdatePopup = ({
  gasto,
  onClose,
}: {
  gasto: Gasto;
  onClose: () => void;
}) => {
  const [data, setData] = useState<Gasto>(gasto);

  return (
    <div className="w-full h-full popup-container-bg absolute top-0 left-0 flex items-center justify-center">
      <div className="w-[45rem] h-[35rem] flex flex-col bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Actualizar Gasto</h2>
          <button onClick={onClose} className="text-xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-1 w-full p-4">
          <form
            className="flex flex-col justify-between w-full"
            action={async () => {
              const response = await updateGasto(gasto._id, data);

              if (response?.error) {
                toast.error(response.error);
                onClose();
                return;
              }

              toast.success("Gasto actualizado exitosamente");
              onClose();
            }}
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
                placeholder="Titulo"
                className="p-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Monto"
                onChange={(e) => setData({ ...data, value: +e.target.value })}
                value={data.value}
                name="value"
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
