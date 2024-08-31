"use client";

import toast, { Toaster } from "react-hot-toast";
import { useOptimistic, useState } from "react";
import CreatePopup from "./create-popup/CreatePopup";
import DeleteButton from "./DeleteButton";
import { deleteServicios } from "../actions";
import UpdatePopup from "./update-popup/UpdatePopup";
import { Servicio } from "@/interfaces/servicio.interface";

export interface OptimisticServicio extends Servicio {
  optimistic?: boolean;
}

const ServiciosPage = ({ data }: { data: { servicios: Servicio[] } }) => {
  const [optimisticServicios, updateOptimisticServicios] = useOptimistic<
    OptimisticServicio[],
    {
      type: string;
      payload: any;
    }
  >(data.servicios, (state, action: { type: string; payload: any }) => {
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
  const [selectedServicio, setSelectedServicio] = useState<Servicio | null>(null);

  const handleAddServicio = (newServicio: Servicio) => {
    updateOptimisticServicios({ type: "ADD", payload: newServicio });
  };

  // Función para eliminar un gasto optimísticamente
  const handleRemoveServicio = (idToRemove: string) => {
    updateOptimisticServicios({ type: "REMOVE", payload: { _id: idToRemove } });
  };

  const handleUpdateServicio = (idToUpdate: string, updates: Servicio) => {
    updateOptimisticServicios({
      type: "UPDATE",
      payload: { _id: idToUpdate, updates },
    });
  };

  return (
    <>
      {showCreatePopup && (
        <CreatePopup
          addOptimistic={(servicio) => {
            setShowCreatePopup(false);
            handleAddServicio(servicio);
          }}
          onClose={() => setShowCreatePopup(false)}
        />
      )}

      {showUpdatePopup && selectedServicio && (
        <UpdatePopup
          updateOptimistic={(servicio) => {
            handleUpdateServicio(servicio._id, servicio);
          }}
          servicio={selectedServicio}
          onClose={() => setShowUpdatePopup(false)}
        />
      )}
      <div className="w-full flex justify-between items-center h-fit">
        <Toaster />
        <div>
          <h1 className="text-2xl font-bold">Servicios</h1>
          <p className="text-lg">Registro de tus servicios</p>
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
                <th className="px-4 py-2">Servicio</th>
                <th className="px-4 py-2">Valor</th>
                <th className="px-4 py-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 font-medium">
              {optimisticServicios
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((servicio) => (
                  <tr key={servicio._id}>
                    <td className="px-4 py-6 h-fit border-y border-gray-300">
                      {new Date(servicio.createdAt).toLocaleDateString("es-Ar")}
                    </td>
                    <td className="px-4 py-6  border-y border-gray-300">
                      {servicio.title}
                    </td>
                    <td className="px-4 py-6  border-y border-gray-300">
                      {servicio.value}
                    </td>
                    <td className="px-4 py-6 text-right  border-y border-gray-300">
                      <div className="w-full flex gap-4 justify-end items-center">
                        <button
                          disabled={servicio.optimistic}
                          onClick={() => {
                            setSelectedServicio(servicio);
                            setShowUpdatePopup(true);
                          }}
                          className="mr-2 text-sm basis-[50%] flex items-center justify-center"
                        >
                          {servicio.optimistic ? (
                            <div className="h-2.5 rounded-full bg-gray-700 w-14 animate-pulse"></div>
                          ) : (
                            "Editar"
                          )}
                        </button>
                        {servicio.optimistic ? (
                          <div className="h-2.5 rounded-full bg-gray-700 w-20 animate-pulse"></div>
                        ) : (
                          <form
                            className="basis-[30%] flex items-center justify-center"
                            action={async () => {
                              handleRemoveServicio(servicio._id);
                              const response = await deleteServicios(servicio._id);
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

export default ServiciosPage;
