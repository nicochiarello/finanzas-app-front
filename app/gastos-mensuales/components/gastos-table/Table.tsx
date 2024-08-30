"use client";

import { Gasto } from "@/interfaces/gasto.interface";
import DeleteButton from "./DeleteButton";
import { deleteGasto } from "../../actions";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import CreatePopup from "../create-popup/CreatePopup";
import UpdatePopup from "../update-popup/UpdatePopup";
import formatDate from "@/utils/formatDate";

const Table = ({ data }: { data: { gastos: Gasto[] } }) => {
  const [showCreatePopup, setShowCreatePopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedGasto, setSelectedGasto] = useState<Gasto | null>(null);

  return (
    <>
      {showCreatePopup && (
        <CreatePopup onClose={() => setShowCreatePopup(false)} />
      )}

      {showUpdatePopup && selectedGasto && (
        <UpdatePopup
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
      <div className="flex flex-1 bg-white rounded-xl shadow-xl overflow-y-scroll">
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
              {data.gastos
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
                        ${gasto.value}
                      </td>
                      <td className="px-4 py-6 text-right  border-y border-gray-300">
                        <div className="w-full flex gap-4 justify-end items-center">
                          <button
                            onClick={() => {
                              setSelectedGasto(gasto);
                              setShowUpdatePopup(true);
                            }}
                            className="mr-2 text-sm basis-[50%] text-center"
                          >
                            Editar
                          </button>
                          <form
                            className="basis-[30%] flex items-center justify-center"
                            action={async () => {
                              const response = await deleteGasto(gasto._id);
                              if (response?.error) {
                                toast.error(response.error);
                              } else {
                                toast.success("Gasto eliminado exitosamente");
                              }
                            }}
                          >
                            <DeleteButton />
                          </form>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
