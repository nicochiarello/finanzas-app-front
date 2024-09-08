import React from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="h-[3.5rem] bg-indigo-500 flex items-center justify-center text-white rounded-lg"
    >
      {pending ? <ClipLoader color="white" size={20} /> : "Actualizar"}
    </button>
  );
};

export default UpdateButton;
