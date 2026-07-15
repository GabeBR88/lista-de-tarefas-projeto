"use client";

interface TarefaItemProps {
  id: number;
  titulo: string;
  concluida: boolean;
  created_at: string;
  editando: boolean;
  textoEdicao: string;
  onToggle: (id: number) => void;
  onEdit: (id: number, titulo: string) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  onTextoEdicaoChange: (texto: string) => void;
}

export function TarefaItem({
  id,
  titulo,
  concluida,
  created_at,
  editando,
  textoEdicao,
  onToggle,
  onEdit,
  onSave,
  onDelete,
  onTextoEdicaoChange,
}: TarefaItemProps) {
  return (
    <div
      className={`flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm transition-all hover:shadow-md ${
        concluida ? "bg-gray-100" : ""
      }`}
    >
      {/* Checkbox */}
      <button
        onClick={() => onToggle(id)}
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${
          concluida
            ? "border-(--color-primary) bg-(--color-primary)"
            : "border-gray-300 hover:border-(--color-primary)"
        }`}
      >
        {concluida && <i className="bi bi-check-lg text-sm text-white"></i>}
      </button>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        {editando ? (
          <input
            type="text"
            value={textoEdicao}
            onChange={(e) => onTextoEdicaoChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSave(id)}
            className="w-full rounded-lg border border-(--color-primary) px-3 py-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-(--color-primary)/20"
            autoFocus
          />
        ) : (
          <p
            className={`text-gray-800 ${
              concluida ? "italic text-gray-400 line-through" : ""
            }`}
          >
            {titulo}
          </p>
        )}
        <span className="text-xs text-gray-400">{created_at}</span>
      </div>

      {/* Botões de ação */}
      <div className="flex shrink-0 gap-2">
        {editando ? (
          <button
            onClick={() => {
              if (textoEdicao.trim() !== "") {
                onSave(id);
              }
            }}
            className="rounded-lg bg-(--color-primary) p-2 text-white hover:bg-(--color-primary-light) transition-colors cursor-pointer"
            title="Salvar"
          >
            <i className="bi bi-check-lg"></i>
          </button>
        ) : (
          <button
            onClick={() => onEdit(id, titulo)}
            className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-(--color-primary-light)/20 hover:text-(--color-primary) transition-colors cursor-pointer"
            title="Editar"
          >
            <i className="bi bi-pencil"></i>
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="rounded-lg bg-gray-100 p-2 text-gray-600 hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
          title="Excluir"
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
}
