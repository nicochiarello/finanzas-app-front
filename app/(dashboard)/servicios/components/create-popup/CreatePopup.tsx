"use client";

import { createServicio } from "../../actions";
import CreateButton from "./CreateButton";
import toast from "react-hot-toast";

import { OptimisticServicio } from "../ServiciosPage";

const CreatePopup = ({
  onClose,
  addOptimistic,
}: {
  onClose: () => void;
  addOptimistic: (tarjeta: OptimisticServicio) => void;
}) => {
  return (
    <div className="w-full h-full popup-container-bg absolute z-10 top-0 left-0 flex items-center justify-center">
      <div className="w-[45rem] h-[35rem] flex flex-col bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Agregar Servicio</h2>
          <button onClick={onClose} className="text-xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-1 w-full p-4">
          <form
            action={async (formData: FormData) => {
              const response = await createServicio(formData);

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
                  createdAt:
                    (formData.get("date") as string) ||
                    new Date().toISOString(),
                  updatedAt:
                    (formData.get("date") as string) ||
                    new Date().toISOString(),
                });
              }

              onClose();
            }}
            className="flex flex-col justify-between w-full"
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Servicio"
                name="title"
                required
                className="p-2 border rounded-lg"
              />
              <input
                type="number"
                placeholder="Valor"
                name="value"
                required
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
