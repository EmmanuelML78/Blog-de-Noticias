"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

interface FormValues {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El apellido es requerido"),
  email: Yup.string()
    .email("Correo electrónico inválido")
    .required("El correo electrónico es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Es necesario confirmar la contraseña"),
});

const Registro: React.FC = () => {
  const router = useRouter();

  const initialValues: FormValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
        values
      );

      if (response.status === 200) {
        // El registro fue exitoso
        toast.success("Usuario registrado con éxito");

        // Iniciar sesión automáticamente después del registro
        await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        // Redirigir a la página de inicio de sesión o a donde desees
        router.push("/");
      } else {
        toast.error("Error al registrar usuario");
      }
    } catch (error) {
      toast.error("Error al registrar usuario");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center mb-6">Registro</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ touched, errors }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block font-semibold mb-1">
                  Nombre:
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="firstName"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block font-semibold mb-1">
                  Apellido:
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="lastName"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-1">
                  Correo Electrónico:
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="example@example.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-semibold mb-1">
                  Contraseña:
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="********"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block font-semibold mb-1">
                  Confirmar Contraseña:
                </label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="********"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-600"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Registrarse
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registro;
