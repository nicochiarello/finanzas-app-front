"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import MonthPicker from "../month-picker/MonthPicker";

const DateSelector = ({ baseHref }: { baseHref: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedData, setSelectedData] = React.useState<Record<string, any>>({
    year: null,
    month: null,
  });

  const month = searchParams.get("month") || "";
  const year = searchParams.get("year") || "";

  const params = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    let date = null;

    if (month && year) {
      date = `${year}-${month}`;
    } else {
      date = new Date().toISOString().split("T")[0];
    }

    setSelectedData({ year, month });
  }, [month, year]);

  return (
    <div>
      <MonthPicker
        initialDate={{
          month: +month,
          year: +year,
        }}
        onDateSelect={(month: number, year: number) => {
          params.set("year", year.toString());
          params.set("month", month.toString());
          router.push(`${baseHref}?${params.toString()}`);
        }}
        onClear={() => {
          params.delete("year");
          params.delete("month");
          router.push(`${baseHref}?${params.toString()}`);
        }}
      />
    </div>
  );
};

export default DateSelector;
