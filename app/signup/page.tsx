export const metadata = {
  title: "Signup",
  description: "Signup page",
  icons: {
    icon: "/favicon.png",
  },
};

import SignupForm from "./components/SignupForm";

export default async function Page() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-zinc-100">
      <div className="flex flex-col bg-white shadow-lg pt-2 w-[34rem] min-h-[44rem] rounded-xl">
        <div className="p-4 flex flex-col items-center gap-2">
          <div className="w-[5rem] h-[5rem] rounded-full bg-white-300 shadow-2xl text-4xl flex items-center justify-center">
            <p>💸</p>
          </div>
          <h1 className="text-2xl font-bold">Finanzas App</h1>
          <p className="text-gray-500">
            Crea una cuenta para continuar con tus finanzas
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
