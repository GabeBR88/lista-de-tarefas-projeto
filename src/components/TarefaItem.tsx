"use client";

import { useState } from "react";

interface Subtarefa {
  id: number;
  task_id?: number;
  titulo: string;
  concluida: boolean;
  editando?: boolean;
}

interface TarefaItemProps {
  id: number;
  titulo: string;
  concluida: boolean;
  created_at: string;
  editando: boolean;
  textoEdicao: string;
  subtarefas?: Subtarefa[];
  adicionandoSubtarefa?: boolean;
  novaSubtarefaTexto?: string;
  onToggle: (id: number) => void;
  onEdit: (id: number, titulo: string) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  onTextoEdicaoChange: (texto: string) => void;
  textoEdicaoSubtarefa?: string;
  onToggleSubtarefa?: (id: number) => void;
  onEditSubtarefa?: (id: number, titulo: string) => void;
  onSaveSubtarefa?: (id: number) => void;
  onDeleteSubtarefa?: (id: number) => void;
  onTextoEdicaoSubtarefaChange?: (texto: string) => void;
  onToggleAdicionarSubtarefa?: (id: number) => void;
  onAdicionarSubtarefa?: (taskId: number) => void;
  onCancelarSubtarefa?: () => void;
  onNovaSubtarefaChange?: (texto: string) => void;
}

export function TarefaItem({
  id,
  titulo,
  concluida,
  created_at,
  editando,
  textoEdicao,
  textoEdicaoSubtarefa,
  subtarefas,
  adicionandoSubtarefa,
  novaSubtarefaTexto,
  onToggle,
  onEdit,
  onSave,
  onDelete,
  onTextoEdicaoChange,
  onToggleSubtarefa,
  onEditSubtarefa,
  onSaveSubtarefa,
  onDeleteSubtarefa,
  onTextoEdicaoSubtarefaChange,
  onToggleAdicionarSubtarefa,
  onAdicionarSubtarefa,
  onCancelarSubtarefa,
  onNovaSubtarefaChange,
}: TarefaItemProps) {
  const [expandido, setExpandido] = useState(true);

  const temSubtarefas = subtarefas && subtarefas.length > 0;
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
      {/* Tarefa principal */}
      <div
        className={`flex items-center gap-4 p-4 ${
          concluida ? "bg-gray-100" : ""
        }`}
      >
        {/* Botão expandir/recolher */}
        {temSubtarefas && (
          <button
            onClick={() => setExpandido(!expandido)}
            className="shrink-0 text-gray-400 hover:text-gray-600 cursor-pointer"
            title={expandido ? "Recolher subtarefas" : "Expandir subtarefas"}
          >
            <i
              className={`bi bi-chevron-down text-sm transition-transform duration-200 inline-block ${
                expandido ? "rotate-180" : ""
              }`}
            ></i>
          </button>
        )}

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
              className={`text-gray-800 font-medium ${
                concluida ? "italic text-gray-400 line-through" : ""
              }`}
            >
              {titulo}
            </p>
          )}
          {!editando && temSubtarefas && (
            <span className="text-xs text-(--color-primary)">
              {subtarefas!.filter((s) => s.concluida).length}/
              {subtarefas!.length} concluídas
            </span>
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

      {/* Área de subtarefas */}
      {temSubtarefas && expandido && (
        <div className="border-t border-gray-100 bg-gray-50/50 px-4 py-3">
          <div className="ml-8 space-y-2 border-l-2 border-(--color-primary-lighter)/50 pl-4">
            {subtarefas.map((sub) => (
              <div
                key={sub.id}
                className={`flex items-center gap-3 rounded-lg bg-white px-3 py-2 ${
                  sub.concluida ? "opacity-60" : ""
                }`}
              >
                {/* Checkbox subtarefa */}
                <button
                  onClick={() => onToggleSubtarefa?.(sub.id)}
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors cursor-pointer ${
                    sub.concluida
                      ? "border-(--color-accent) bg-(--color-accent)"
                      : "border-(--color-primary)/50 hover:border-(--color-primary)"
                  }`}
                >
                  {sub.concluida && (
                    <i className="bi bi-check-lg text-xs text-white"></i>
                  )}
                </button>
                {/* Texto subtarefa */}
                {sub.editando ? (
                  <input
                    type="text"
                    value={textoEdicaoSubtarefa}
                    onChange={(e) =>
                      onTextoEdicaoSubtarefaChange?.(e.target.value)
                    }
                    onKeyDown={(e) =>
                      e.key === "Enter" && onSaveSubtarefa?.(sub.id)
                    }
                    className="flex-1 rounded border border-(--color-accent) px-2 py-0.5 text-sm text-gray-700 focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <p
                    className={`flex-1 text-sm ${
                      sub.concluida
                        ? "italic text-gray-400 line-through"
                        : "text-gray-600"
                    }`}
                  >
                    {sub.titulo}
                  </p>
                )}
                {/* Ações subtarefa */}
                {sub.editando ? (
                  <button
                    onClick={() => onSaveSubtarefa?.(sub.id)}
                    className="rounded p-1 text-green-500 hover:bg-green-50 cursor-pointer"
                    title="Salvar"
                  >
                    <i className="bi bi-check-lg text-xs"></i>
                  </button>
                ) : (
                  <button
                    onClick={() => onEditSubtarefa?.(sub.id, sub.titulo)}
                    className="rounded p-1 text-gray-400 hover:text-(--color-primary) hover:bg-gray-50 cursor-pointer"
                    title="Editar"
                  >
                    <i className="bi bi-pencil text-xs"></i>
                  </button>
                )}
                <button
                  onClick={() => onDeleteSubtarefa?.(sub.id)}
                  className="rounded p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 cursor-pointer"
                  title="Excluir"
                >
                  <i className="bi bi-trash text-xs"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botão adicionar subtarefa */}
      <div className="border-t border-gray-100 px-4 py-2">
        {adicionandoSubtarefa ? (
          <div className="ml-8 flex gap-2">
            <input
              type="text"
              value={novaSubtarefaTexto}
              onChange={(e) => onNovaSubtarefaChange?.(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onAdicionarSubtarefa?.(id)}
              placeholder="Nova subtarefa..."
              className="flex-1 rounded-lg border border-(--color-primary-lighter) px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-(--color-primary)"
              autoFocus
            />
            <button
              onClick={() => onAdicionarSubtarefa?.(id)}
              className="rounded-lg bg-(--color-primary) p-1.5 text-white hover:bg-(--color-primary-light) cursor-pointer"
            >
              <i className="bi bi-plus text-sm"></i>
            </button>
            <button
              onClick={() => onCancelarSubtarefa?.()}
              className="rounded-lg p-1.5 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="bi bi-x text-sm"></i>
            </button>
          </div>
        ) : (
          <button
            onClick={() => onToggleAdicionarSubtarefa?.(id)}
            className="ml-8 flex items-center gap-1 text-xs text-(--color-primary) hover:text-(--color-primary-light) cursor-pointer py-1"
          >
            <i className="bi bi-plus-circle"></i>
            Adicionar subtarefa
          </button>
        )}
      </div>
    </div>
  );
}
