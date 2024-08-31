import React from "react";
import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const CreateButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="h-[3.5rem] bg-indigo-500 flex items-center justify-center text-white rounded-lg"
    >
      {pending ? <ClipLoader size={20} color="white" /> : "Crear"}
    </button>
  );
};

export default CreateButton;
