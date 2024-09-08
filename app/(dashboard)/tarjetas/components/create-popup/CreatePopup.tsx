"use client";

import { createTarjeta } from "../../actions";
import CreateButton from "./CreateButton";
import toast from "react-hot-toast";

import { OptimisticTarjeta } from "../TarjetasPage";

const CreatePopup = ({
  onClose,
  addOptimistic,
}: {
  onClose: () => void;
  addOptimistic: (tarjeta: OptimisticTarjeta) => void;
}) => {
  return (
    <div className="w-full h-full popup-container-bg absolute top-0 left-0 flex items-center justify-center">
      <div className="w-[45rem] h-[35rem] flex flex-col bg-white rounded-lg">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Agregar Tarjeta</h2>
          <button onClick={onClose} className="text-xl font-bold">
            X
          </button>
        </div>

        <div className="flex flex-1 w-full p-4">
          <form
            action={async (formData: FormData) => {
              const response = await createTarjeta(formData);

              if (response?.error) {
                toast.error(response.error);
                onClose();
                return;
              } else {
                addOptimistic({
                  _id: Math.random().toString(),
                  optimistic: true,
                  brand: Number(formData.get("brand")),
                  entity: formData.get("entity") as string,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                });
              }

              onClose();
            }}
            className="flex flex-col justify-between w-full"
          >
            <div className="flex flex-col gap-4">
              <select name="brand" required className="p-2 border rounded-lg">
                <option value="0">Visa</option>
                <option value="1">Mastercard</option>
                <option value="2">American Express</option>
              </select>

              <input
                type="string"
                placeholder="Banco"
                name="entity"
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
