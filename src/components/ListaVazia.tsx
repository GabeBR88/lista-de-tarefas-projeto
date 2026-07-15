export function ListaVazia() {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow-md">
      <i className="bi bi-inbox text-6xl text-gray-300"></i>
      <p className="mt-4 text-lg text-gray-500">
        Nenhuma tarefa adicionada ainda.
      </p>
      <p className="text-gray-400">Comece adicionando uma tarefa acima.</p>
    </div>
  );
}
