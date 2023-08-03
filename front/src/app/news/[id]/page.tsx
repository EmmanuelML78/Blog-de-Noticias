"use client";

import { useGetNewsByIdQuery } from "@/redux/services/newsApi";

const Detail = () => {
  const { data, isLoading, isError } = useGetNewsByIdQuery("6");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching article</div>;
  }

  if (!data) {
    return <div>Article not found</div>;
  }

  const { id, title, content, image } = data;

  return (
    <div className="max-w-lg mx-auto bg-white rounded shadow-lg p-8 mt-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      <p className="text-gray-600 mb-4">{content}</p>
      <img className="w-full rounded" src={image} alt={title} />

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Comentarios</h3>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-gray-800">Usuario1 dice:</p>
          <p className="text-gray-600">
            ¡Excelente noticia! Gracias por compartirla.
          </p>
        </div>
        <div className="bg-gray-100 p-4 mt-4 rounded-lg">
          <p className="text-gray-800">Usuario2 dice:</p>
          <p className="text-gray-600">
            Interesante, ¿tienen más información al respecto?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
