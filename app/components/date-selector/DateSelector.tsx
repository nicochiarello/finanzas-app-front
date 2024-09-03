"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const DateSelector = ({ baseHref }: { baseHref: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedData, setSelectedData] = React.useState<Record<string, any>>({
    year: null,
    month: null,
  });

  const month = searchParams.get("month") || "";
  const year = searchParams.get("year") || "";

  useEffect(() => {
    let date = null;

    if (month && year) {
      date = `${year}-${month}`;
    } else {
      date = new Date().toISOString().split("T")[0];
    }

    setSelectedData({ year, month });
  }, [month, year]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month] = e.target.value.split("-");
    router.push(`${baseHref}?year=${year}&month=${month}`);
  };

  return (
    <div>
      <input
        value={
          selectedData.year && selectedData.month
            ? `${selectedData.year}-${selectedData.month}`
            : ""
        }
        className="bg-transparent text-lg border p-2 font-bold text-gray-800 mt-2 rounded-lg"
        onChange={handleOnChange}
        type="month"
        id="date"
      />
    </div>
  );
};

export default DateSelector;
