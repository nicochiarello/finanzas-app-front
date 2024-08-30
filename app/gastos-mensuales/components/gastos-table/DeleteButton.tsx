"use client";
import React from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const DeleteButton = () => {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="text-sm w-full">
      {pending ? <ClipLoader size={10} color="black" /> : "Eliminar"}
    </button>
  );
};

export default DeleteButton;
