"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import MonthPicker from "../month-picker/MonthPicker";

const DateSelector = ({ baseHref }: { baseHref: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const month = searchParams.get("month") || "";
  const year = searchParams.get("year") || "";

  const params = new URLSearchParams(searchParams.toString());

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
