import React from "react";
import Link from "next/link";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold mb-1">
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="tucorreo@example.com"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold mb-1">
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">¿No tienes una cuenta?</span>{" "}
          <Link
            href="/register"
            className="text-blue-500 font-semibold hover:text-blue-600">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
