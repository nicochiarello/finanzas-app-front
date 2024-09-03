"use client";

import { Gasto } from "@/interfaces/gasto.interface";
import DeleteButton from "./DeleteButton";
import { deleteGasto } from "../../actions";
import toast, { Toaster } from "react-hot-toast";
import { useOptimistic, useState } from "react";
import CreatePopup from "../create-popup/CreatePopup";
import UpdatePopup from "../update-popup/UpdatePopup";
import formatDate from "@/utils/formatDate";
import DateSelector from "@/app/components/date-selector/DateSelector";
import TotalViewer from "@/app/components/total-viewer/TotalViewer";

export interface OptimisticGasto extends Gasto {
  optimistic?: boolean;
}

const Table = ({ data }: { data: { gastos: Gasto[] } }) => {
  const [optimisticGastos, updateOptimisticGastos] = useOptimistic<
    OptimisticGasto[],
    {
      type: string;
      payload: any;
    }
  >(data.gastos, (state, action: { type: string; payload: any }) => {
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
  const [selectedGasto, setSelectedGasto] = useState<Gasto | null>(null);

  // Función para agregar un gasto optimísticamente
  const handleAddGasto = (newGasto: Gasto) => {
    updateOptimisticGastos({ type: "ADD", payload: newGasto });
  };

  // Función para eliminar un gasto optimísticamente
  const handleRemoveGasto = (idToRemove: string) => {
    updateOptimisticGastos({ type: "REMOVE", payload: { _id: idToRemove } });
  };

  const handleUpdateGasto = (idToUpdate: string, updates: Gasto) => {
    updateOptimisticGastos({
      type: "UPDATE",
      payload: { _id: idToUpdate, updates },
    });
  };

  return (
    <>
      {showCreatePopup && (
        <CreatePopup
          addOptimistic={(gasto) => {
            setShowCreatePopup(false);
            handleAddGasto(gasto);
          }}
          onClose={() => setShowCreatePopup(false)}
        />
      )}

      {showUpdatePopup && selectedGasto && (
        <UpdatePopup
          updateOptimistic={(gasto) => {
            handleUpdateGasto(gasto._id, gasto);
          }}
          gasto={selectedGasto}
          onClose={() => setShowUpdatePopup(false)}
        />
      )}
      <div className="w-full flex justify-between items-center h-fit">
        <Toaster />
        <div>
          <h1 className="text-2xl font-bold">Gastos Mensuales</h1>
          <p className="text-lg">Registro de tus gastos mensuales</p>
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
      <DateSelector baseHref="/gastos-mensuales" />

      <div className="flex flex-1 bg-white h-full rounded-xl shadow-xl overflow-y-scroll">
        <div className="flex w-full h-full bg-white rounded-xl">
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
              {optimisticGastos
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((gasto) => {
                  return (
                    <tr key={gasto._id}>
                      <td className="px-4 py-6  border-y border-gray-300">
                        {formatDate(gasto.createdAt)}
                      </td>
                      <td className="px-4 py-6  border-y border-gray-300">
                        {gasto.title}
                      </td>
                      <td className="px-4 py-6  border-y border-gray-300">
                        ${gasto.value.toLocaleString('es-AR')}
                      </td>
                      <td className="px-4 py-6 text-right  border-y border-gray-300">
                        <div className="w-full flex gap-4 justify-end items-center">
                          <button
                            disabled={gasto.optimistic}
                            onClick={() => {
                              setSelectedGasto(gasto);
                              setShowUpdatePopup(true);
                            }}
                            className="mr-2 text-sm basis-[50%] flex items-center justify-center"
                          >
                            {gasto.optimistic ? (
                              <div className="h-2.5 rounded-full bg-gray-700 w-14 animate-pulse"></div>
                            ) : (
                              "Editar"
                            )}
                          </button>
                          {gasto.optimistic ? (
                            <div className="h-2.5 rounded-full bg-gray-700 w-20 animate-pulse"></div>
                          ) : (
                            <form
                              className="basis-[30%] flex items-center justify-center"
                              action={async () => {
                                handleRemoveGasto(gasto._id);
                                const response = await deleteGasto(gasto._id);
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
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      <TotalViewer totalList={optimisticGastos.map((item) => item.value)} />
    </>
  );
};

export default Table;
