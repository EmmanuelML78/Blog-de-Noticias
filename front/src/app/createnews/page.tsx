"use client";

const CrearNoticia = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-center mb-6">Crear Noticia</h2>
        <div>
          <div className="mb-4">
            <label htmlFor="title" className="block font-semibold mb-1">
              Título:
            </label>
            <input
              type="text"
              id="title"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Título de la noticia"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block font-semibold mb-1">
              Contenido:
            </label>
            <textarea
              id="content"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Contenido de la noticia"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block font-semibold mb-1">
              Imagen de la noticia:
            </label>
            <input
              type="file"
              id="image"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
            Crear Noticia
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearNoticia;
