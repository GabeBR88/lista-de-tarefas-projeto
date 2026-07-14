import { SecaoTituloProps } from "@/types/interfaces";

export function SecaoTitulo({ titulo, subtitulo }: SecaoTituloProps) {
  return (
    <div className="mb-12">
      <h2 className="text-center text-3xl font-bold text-gray-800 sm:text-4xl">
        {titulo}
      </h2>
      {subtitulo && (
        <p className="mt-4 text-center text-gray-600">{subtitulo}</p>
      )}
    </div>
  );
}
