"use client";

import { useState, useRef, useEffect } from "react";

const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

// All years from 2000 to current year
const years = Array.from(
  { length: new Date().getFullYear() - 2000 },
  (_, i) => 2000 + i + 1
);

const currentYear = new Date().getFullYear();

const MonthPicker = ({
  onDateSelect,
  initialDate,
  onClear,
}: {
  onDateSelect: (month: number, year: number) => void;
  initialDate?: {
    month: number;
    year: number;
  };
  onClear?: () => void;
}) => {
  const [selectorOpen, setSelectorOpen] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(
    initialDate?.month || null
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(
    initialDate?.year || null
  );

  // 0 -> month
  // 1 -> year
  const [selectiontype, setSelectionType] = useState(0);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setSelectionType(0);
      setSelectorOpen(false);
    }
  };

  useEffect(() => {
    if (selectorOpen) {
      // Añadir listener cuando el selector está abierto
      document.addEventListener("click", handleClickOutside);
    } else {
      // Remover listener cuando está cerrado
      document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup: remover listener al desmontar el componente
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectorOpen]);

  useEffect(() => {
    if (selectedMonth != null && selectedYear != null) {
      onDateSelect(selectedMonth, selectedYear);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear]);

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className="w-[15rem] relative z-0"
    >
      <div
        onClick={() => setSelectorOpen((prev) => !prev)}
        className="py-2 border rounded-xl px-2 cursor-pointer relative"
      >
        <p className="font-semibold">
          {selectedMonth != null && selectedYear != null
            ? `${monthNames[selectedMonth - 1]} ${selectedYear}`
            : "Seleccionar mes"}
        </p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute right-2 top-0 translate-y-1/2"
          viewBox="0 0 20 20"
          fill="currentColor"
        
        >
          <path
            fillRule="evenodd"
            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
          />
          <path
            fillRule="evenodd"
            d="M10 18a2 2 0 100-4 2 2 0 000 4z"
          />
          <path
            fillRule="evenodd"
            d="M10 6a2 2 0 100-4 2 2 0 000 4z"
          />
        </svg>

      </div>
      <div className="w-full flex flex-col absolute top-[100%] px-2 h-fit bg-white rounded-xl shadow-xl">
        {selectorOpen && (
          <div className="p-1">
            <div>
              <p
                onClick={() => setSelectionType(1)}
                className={`py-2 border-b cursor-pointer ${
                  selectiontype === 1
                    ? "text-indigo-500 border-black"
                    : "hover:text-indigo-500"
                }`}
              >
                {selectedYear != null ? selectedYear : "Seleccionar año"}
              </p>
            </div>

            <div
              className={`${
                selectiontype === 0 ? "grid" : "hidden"
              }  grid-cols-3 text-center gap-2`}
            >
              {monthNames.map((month) => (
                <p
                  key={month}
                  onClick={() => {
                    if (selectedYear === null) {
                      setSelectedYear(currentYear);
                    }

                    setSelectedMonth(monthNames.indexOf(month) + 1);
                    setSelectorOpen(false);
                  }}
                  className={`py-2 border-b text-sm hover:text-indigo-500 hover:border-indigo-500 cursor-pointer ${
                    selectedMonth === monthNames.indexOf(month) + 1
                      ? "text-indigo-500 border-indigo-500"
                      : ""
                  }`}
                >
                  {month.slice(0, 3)}
                </p>
              ))}
            </div>
            <div
              className={`${
                selectiontype === 1 ? "flex" : "hidden"
              } flex-col gap-2 w-full h-[15rem] overflow-scroll`}
            >
              {years
                .map((year) => (
                  <p
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setSelectionType(0);
                    }}
                    className="py-2 border-b hover:text-indigo-500 cursor-pointer"
                  >
                    {year}
                  </p>
                ))
                .reverse()}
            </div>
            <div className="flex w-full justify-between py-4 text-xs">
              <p
                onClick={() => {
                  setSelectedMonth(null);
                  setSelectedYear(null);

                  if (onClear) {
                    onClear();
                  }

                  setSelectorOpen(false);
                }}
                className="text-indigo-500 cursor-pointer"
              >
                Clear
              </p>
              <p
                onClick={() => {
                  setSelectedMonth(new Date().getMonth() + 1);
                  setSelectedYear(new Date().getFullYear());
                  setSelectorOpen(false);
                }}
                className="text-indigo-500 cursor-pointer"
              >
                This month
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthPicker;
