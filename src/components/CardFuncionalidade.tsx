interface CardFuncionalidadeProps {
  icone: string;
  titulo: string;
  descricao: string;
}

export function CardFuncionalidade({
  icone,
  titulo,
  descricao,
}: CardFuncionalidadeProps) {
  return (
    <div className="rounded-2xl bg-white p-6 text-center shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-(--color-primary)/10">
        <i className={`${icone} text-2xl text-(--color-primary)`}></i>
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{titulo}</h3>
      <p className="text-gray-600">{descricao}</p>
    </div>
  );
}
