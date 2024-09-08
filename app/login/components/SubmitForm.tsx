"use client";

import { useFormStatus } from "react-dom";
import { ClipLoader } from "react-spinners";

const SubmitForm = () => {
  const { pending } = useFormStatus();

  return (
    <div className="flex flex-col gap-2">
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 mt-8 rounded-lg"
      >
        {pending ? <ClipLoader size={20} color="white" /> : "Iniciar Sesión"}
      </button>
    </div>
  );
};

export default SubmitForm;
