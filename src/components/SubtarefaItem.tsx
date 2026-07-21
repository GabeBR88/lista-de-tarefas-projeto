"use client";

interface SubtarefaItemProps {
  id: number;
  titulo: string;
  concluida: boolean;
  editando: boolean;
  textoEdicao: string;
  onToggle: (id: number) => void;
  onEdit: (id: number, titulo: string) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  onTextoEdicaoChange: (texto: string) => void;
}

export function SubtarefaItem({
  id,
  titulo,
  concluida,
  editando,
  textoEdicao,
  onToggle,
  onEdit,
  onSave,
  onDelete,
  onTextoEdicaoChange,
}: SubtarefaItemProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg bg-(--color-primary-lighter)/20 px-3 py-2 transition-all ${
        concluida ? "opacity-60" : ""
      }`}
    >
      {/* Checkbox menor */}
      <button
        onClick={() => onToggle(id)}
        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${
          concluida
            ? "border-(--color-accent) bg-(--color-accent)"
            : "border-(--color-primary)/50 hover:border-(--color-primary)"
        }`}
      >
        {concluida && <i className="bi bi-check-lg text-xs text-white"></i>}
      </button>

      {/* Conteúdo */}
      <div className="flex-1 min-w-0">
        {editando ? (
          <input
            type="text"
            value={textoEdicao}
            onChange={(e) => onTextoEdicaoChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSave(id)}
            className="w-full rounded border border-(--color-accent) px-2 py-1 text-sm text-gray-700 focus:outline-none"
            autoFocus
          />
        ) : (
          <p
            className={`text-sm ${concluida ? "italic text-gray-400 line-through" : "text-gray-600"}`}
          >
            {titulo}
          </p>
        )}
      </div>

      {/* Ações */}
      <div className="flex shrink-0 gap-1">
        {editando ? (
          <button
            onClick={() => onSave(id)}
            className="rounded p-1 text-green-500 hover:bg-green-50 cursor-pointer"
            title="Salvar"
          >
            <i className="bi bi-check-lg text-sm"></i>
          </button>
        ) : (
          <button
            onClick={() => onEdit(id, titulo)}
            className="rounded p-1 text-gray-400 hover:text-(--color-primary) hover:bg-gray-50 cursor-pointer"
            title="Editar"
          >
            <i className="bi bi-pencil text-xs"></i>
          </button>
        )}
        <button
          onClick={() => onDelete(id)}
          className="rounded p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
          title="Excluir"
        >
          <i className="bi bi-trash text-xs"></i>
        </button>
      </div>
    </div>
  );
}
