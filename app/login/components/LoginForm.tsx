"use client";

import SubmitForm from "./SubmitForm";
import { login } from "../actions";
import { useState } from "react";
import Link from "next/link";

const LoginForm = () => {
  const [error, setError] = useState<Record<string, any>>({});

  return (
    <form
      action={async (formData: FormData) => {
        try {
          await login(formData);
        } catch (error: any) {
          setError(JSON.parse(error.message));
        }
      }}
      className="flex flex-col gap-4 flex-1 p-8"
    >
      <div className="flex flex-col gap-4 justify-center">
        <div className={`flex flex-col gap-2`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            required
            name="email"
            id="email"
            placeholder="Correo Electrónico"
            className={`p-2 border border-gray-300 rounded-lg ${
              error.email && "border border-red-300"
            }`}
          />
          {error.email && (
            <p className="text-red-500 text-sm">
              {" "}
              {error.email[0].toUpperCase() + error.email.slice(1)}{" "}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Contraseña"
            required
            name="password"
            className={`p-2 border border-gray-300 rounded-lg ${
              error.password && "border border-red-300"
            }`}
          />
          {error.password && (
            <p className="text-red-500 text-sm">
              {" "}
              {error.password[0].toUpperCase() + error.password.slice(1)}{" "}
            </p>
          )}
        </div>

        <SubmitForm />
        <div className="flex justify-center">
          <p>
            ¿No tienes cuenta?{" "}
            <Link href="/signup" className="text-blue-500">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
