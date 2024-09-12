import Image from "next/image";
import LoginForm from "./components/LoginForm";
import Logo from '@/public/favicon.png'

export default async function Page() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-zinc-100">
      <div className="flex flex-col bg-white shadow-lg pt-4 w-[34rem] h-[40rem] rounded-xl">
        <div className="p-8 flex flex-col items-center gap-2">
          <div className="w-[5rem] h-[5rem] text-4xl flex items-center justify-center">
            <Image className="w-full h-full bg-cover" src={Logo} width={400} height={400} alt="Logo" />
          </div>
          <h1 className="text-2xl font-bold">Finanzas App</h1>
          <p className="text-gray-500">
            Inicia sesión para continuar con tus finanzas
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
