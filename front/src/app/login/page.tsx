"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

  const initialValues: FormValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Correo electrónico no válido")
      .required("El correo electrónico es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  });

  const handleSubmit = async (
    values: { email: any; password: any },
    { setSubmitting }: any
  ) => {
    try {
      await validationSchema.validate(values, { abortEarly: false });

      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (response?.error) {
        toast.error("Credenciales incorrectas");
      } else {
        toast.success("Inicio de sesión exitoso");
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((validationError) => {
          toast.error(validationError.message);
        });
      } else {
        console.error(error);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold mb-1">
                  Correo Electrónico:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`w-full border ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 rounded-md focus:outline-none focus:border-blue-500`}
                  placeholder="tucorreo@example.com"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-semibold mb-1">
                  Contraseña:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`w-full border ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  } px-3 py-2 rounded-md focus:outline-none focus:border-blue-500`}
                  placeholder="********"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
                Iniciar Sesión
              </button>
            </form>
          )}
        </Formik>
        <div className="mt-4 text-center">
          <span className="text-gray-600">¿No tienes una cuenta?</span>{" "}
          <a
            href="/register"
            className="text-blue-500 font-semibold hover:text-blue-600">
            Regístrate aquí
          </a>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default LoginPage;
