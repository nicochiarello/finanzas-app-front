import React from "react";

interface TotalViewerProps {
  totalList: number[];
}

const TotalViewer = ({ totalList }: TotalViewerProps) => {
  return (
    <div className="w-full flex items-center justify-between p-4 text-lg font-semibold border rounded-xl bg-white">
      <h1>Total:</h1>
      <p>
        $
        {totalList.reduce((acc, curr) => acc + curr, 0).toLocaleString("es-Ar")}
      </p>
    </div>
  );
};

export default TotalViewer;
