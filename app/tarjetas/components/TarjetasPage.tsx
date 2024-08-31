"use client";

// import { Gasto } from "@/interfaces/gasto.interface";
// import DeleteButton from "./DeleteButton";
// import { deleteGasto } from "../../actions";
import toast, { Toaster } from "react-hot-toast";
import { useOptimistic, useState } from "react";
// import CreatePopup from "../create-popup/CreatePopup";
// import UpdatePopup from "../update-popup/UpdatePopup";
// import formatDate from "@/utils/formatDate";
import { Tarjeta } from "@/interfaces/tarjeta.interface";
import CreatePopup from "./create-popup/CreatePopup";
import DeleteButton from "./DeleteButton";
import { deleteTarjeta } from "../actions";
import UpdatePopup from "./update-popup/UpdatePopup";

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

export interface OptimisticTarjeta extends Tarjeta {
  optimistic?: boolean;
}

const TarjetasPage = ({ data }: { data: { tarjetas: Tarjeta[] } }) => {
  const [optimisticTarjetas, updateOptimisticTarjetas] = useOptimistic<
    OptimisticTarjeta[],
    {
      type: string;
      payload: any;
    }
  >(data.tarjetas, (state, action: { type: string; payload: any }) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            ...action.payload,
            _id: Math.random().toString(), // Generar un ID temporal si es necesario
          },
        ];
      case "REMOVE":
        return state.filter((gasto) => gasto._id !== action.payload._id);
      case "UPDATE":
        return state.map((gasto) =>
          gasto._id === action.payload._id
            ? { ...gasto, ...action.payload.updates }
            : gasto
        );
      default:
        return state;
    }
  });
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedTarjeta, setSelectedTarjeta] = useState<Tarjeta | null>(null);

  const handleAddTarjeta = (newTarjeta: Tarjeta) => {
    updateOptimisticTarjetas({ type: "ADD", payload: newTarjeta });
  };

  // Función para eliminar un gasto optimísticamente
  const handleRemoveTarjeta = (idToRemove: string) => {
    updateOptimisticTarjetas({ type: "REMOVE", payload: { _id: idToRemove } });
  };

  const handleUpdateTarjeta = (idToUpdate: string, updates: Tarjeta) => {
    updateOptimisticTarjetas({
      type: "UPDATE",
      payload: { _id: idToUpdate, updates },
    });
  };

  return (
    <>
      {showCreatePopup && (
        <CreatePopup
          addOptimistic={(tarjeta) => {
            setShowCreatePopup(false);
            handleAddTarjeta(tarjeta);
          }}
          onClose={() => setShowCreatePopup(false)}
        />
      )}

      {showUpdatePopup && selectedTarjeta && (
        <UpdatePopup
          updateOptimistic={(tarjeta) => {
            handleUpdateTarjeta(tarjeta._id, tarjeta);
          }}
          tarjeta={selectedTarjeta}
          onClose={() => setShowUpdatePopup(false)}
        />
      )}
      <div className="w-full flex justify-between items-center h-fit">
        <Toaster />
        <div>
          <h1 className="text-2xl font-bold">Tarjetas</h1>
          <p className="text-lg">Registro de tus tarjetas</p>
        </div>
        <div
          onClick={() => {
            setShowCreatePopup(true);
          }}
          className="px-12 py-4 rounded-xl shadow-xl font-medium bg-indigo-500 text-whit hover:bg-indigo-700 text-white cursor-pointer"
        >
          Agregar
        </div>
      </div>
      <div className="flex flex-1 bg-white rounded-xl shadow-xl overflow-y-scroll">
        <div className="flex w-full h-full bg-white rounded-xl">
          <table className="table-auto w-full text-left h-fit">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Tarjeta</th>
                <th className="px-4 py-2">Banco</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {optimisticTarjetas
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((tarjeta) => (
                  <tr key={tarjeta._id}>
                    <td className="px-4 py-6 h-fit border-y border-gray-300">
                      {new Date(tarjeta.createdAt).toLocaleDateString("es-Ar")}
                    </td>
                    <td className="px-4 py-6  border-y border-gray-300">
                      {tarjetaHandler(tarjeta.brand)}
                    </td>
                    <td className="px-4 py-6  border-y border-gray-300">
                      {tarjeta.entity}
                    </td>
                    <td className="px-4 py-6 text-right  border-y border-gray-300">
                      <div className="w-full flex gap-4 justify-end items-center">
                        <button
                          disabled={tarjeta.optimistic}
                          onClick={() => {
                            setSelectedTarjeta(tarjeta);
                            setShowUpdatePopup(true);
                          }}
                          className="mr-2 text-sm basis-[50%] flex items-center justify-center"
                        >
                          {tarjeta.optimistic ? (
                            <div className="h-2.5 rounded-full bg-gray-700 w-14 animate-pulse"></div>
                          ) : (
                            "Editar"
                          )}
                        </button>
                        {tarjeta.optimistic ? (
                          <div className="h-2.5 rounded-full bg-gray-700 w-20 animate-pulse"></div>
                        ) : (
                          <form
                            className="basis-[30%] flex items-center justify-center"
                            action={async () => {
                              handleRemoveTarjeta(tarjeta._id);
                              const response = await deleteTarjeta(tarjeta._id);
                              if (response?.error) {
                                toast.error(response.error);
                              }
                            }}
                          >
                            <DeleteButton />
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TarjetasPage;
