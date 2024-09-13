"use client";

import toast, { Toaster } from "react-hot-toast";
import { useOptimistic, useState } from "react";

import { Brand, Tarjeta } from "@/interfaces/tarjeta.interface";
import CreatePopup from "./create-popup/CreatePopup";
import DeleteButton from "./DeleteButton";
import { deleteCuota } from "../actions";
import UpdatePopup from "./update-popup/UpdatePopup";
import { Cuota } from "@/interfaces/cuota.interface";
import { tarjetaHandler } from "@/app/(dashboard)/tarjetas/components/TarjetasPage";
import DateSelector from "@/app/components/date-selector/DateSelector";
import TotalViewer from "@/app/components/total-viewer/TotalViewer";
import formatDate from "@/utils/formatDate";
import CardFilter from "./card-filter/CardFilter";
import MonthPicker from "@/app/components/month-picker/MonthPicker";

export interface OptimisticCuota extends Cuota {
  optimistic?: boolean;
}

const CuotasPage = ({
  data,
}: {
  data: { cuotas: Cuota[]; tarjetas: Tarjeta[] };
}) => {
  const [optimisticCuotas, updateOptimisticCuotas] = useOptimistic<
    OptimisticCuota[],
    {
      type: string;
      payload: any;
    }
  >(data.cuotas, (state, action: { type: string; payload: any }) => {
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
        return state.filter((cuota) => cuota._id !== action.payload._id);
      case "UPDATE":
        return state.map((cuota) =>
          cuota._id === action.payload._id
            ? { ...cuota, ...action.payload.updates }
            : cuota
        );
      default:
        return state;
    }
  });
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedCuota, setSelectedCuota] = useState<Cuota | null>(null);

  const handleAddCuota = (newCuota: Cuota) => {
    updateOptimisticCuotas({ type: "ADD", payload: newCuota });
  };

  // Función para eliminar un gasto optimísticamente
  const handleRemoveCuota = (idToRemove: string) => {
    updateOptimisticCuotas({ type: "REMOVE", payload: { _id: idToRemove } });
  };

  const handleUpdateCuota = (idToUpdate: string, updates: Cuota) => {
    updateOptimisticCuotas({
      type: "UPDATE",
      payload: { _id: idToUpdate, updates },
    });
  };

  return (
    <>
      {showCreatePopup && (
        <CreatePopup
          tarjetas={data.tarjetas}
          addOptimistic={(cuota) => {
            setShowCreatePopup(false);
            handleAddCuota(cuota);
          }}
          onClose={() => setShowCreatePopup(false)}
        />
      )}

      {showUpdatePopup && selectedCuota && (
        <UpdatePopup
          tarjetas={data.tarjetas}
          updateOptimistic={(cuota) => {
            handleUpdateCuota(cuota._id, cuota);
          }}
          cuota={selectedCuota}
          onClose={() => setShowUpdatePopup(false)}
        />
      )}
      <div className="w-full flex justify-between items-center h-fit">
        <Toaster />
        <div>
          <h1 className="text-2xl font-bold">Cuotas</h1>
          <p className="text-lg">Registro de tus cuotas</p>
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
      <div className="flex gap-4  items-center">
        <DateSelector baseHref="/cuotas" />
        <CardFilter cards={data.tarjetas} />
      </div>
      <div className="flex flex-1 bg-white rounded-xl shadow-xl overflow-y-scroll">
        <div className="flex w-full h-full bg-white rounded-xl">
          <table className="table-auto w-fit min-w-full text-left h-fit">
            <thead className="border-b-2 border-gray-200">
              <tr>
                <th className="px-4 py-2">Fecha</th>
                <th className="px-4 py-2">Referencia</th>
                <th className="px-4 py-2">Tarjeta</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2">Cuota</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {optimisticCuotas
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((cuota) => (
                  <tr key={cuota._id}>
                    <td className="px-4 py-6 h-fit border-y border-gray-300">
                      {formatDate(cuota.createdAt)}
                    </td>
                    <td className="px-4 py-6 border-y border-gray-300">
                      {cuota.title}
                    </td>
                    <td className="px-4 py-6 border-y border-gray-300">
                      {cuota.card
                        ? `${tarjetaHandler(cuota.card?.brand as Brand)} ${
                            cuota.card?.entity
                          }`
                        : "No especificada"}
                    </td>
                    <td className="px-4 py-6 border-y border-gray-300">
                      ${cuota.value.toLocaleString("es-AR")}
                    </td>
                    <td className="px-4 py-6 border-y border-gray-300">
                      {cuota.paid}/{cuota.qty}
                    </td>
                    <td className="px-4 py-6 text-right  border-y border-gray-300">
                      <div className="w-full flex gap-4 justify-end items-center">
                        <button
                          disabled={cuota.optimistic}
                          onClick={() => {
                            setSelectedCuota(cuota);
                            setShowUpdatePopup(true);
                          }}
                          className="mr-2 text-sm basis-[50%] flex items-center justify-center"
                        >
                          {cuota.optimistic ? (
                            <div className="h-2.5 rounded-full bg-gray-700 w-14 animate-pulse"></div>
                          ) : (
                            "Editar"
                          )}
                        </button>
                        {cuota.optimistic ? (
                          <div className="h-2.5 rounded-full bg-gray-700 w-20 animate-pulse"></div>
                        ) : (
                          <form
                            className="basis-[30%] flex items-center justify-center"
                            action={async () => {
                              handleRemoveCuota(cuota._id);
                              const response = await deleteCuota(cuota._id);
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
      <TotalViewer totalList={optimisticCuotas.map((cuota) => cuota.value)} />
    </>
  );
};

export default CuotasPage;
