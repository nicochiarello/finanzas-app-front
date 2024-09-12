"use client";

import Image from "next/image";

export default function Error() {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
        <Image className="h-[60%] max-h-[40rem]" src="/404-image.svg" width={800} height={800} alt="Error" />
        <div className="text-center">
          <p className="mt-4 text-xl text-gray-700">Ocurrió un error</p>
          <p className="mt-2 text-gray-500">Por favor, inténtalo de nuevo más tarde.</p>
        </div>
      </div>
    );
  }
  
