"use client";

import { TarefaItem } from "@/components/TarefaItem";
import type { Tarefa } from "@/types/interfaces";

interface TarefaColunaProps {
  tarefas: Tarefa[];
  editandoId: number | null;
  textoEdicao: string;
  onTextoEdicaoChange: (texto: string) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, titulo: string) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  adicionandoSubtarefaEm?: number | null;
  novaSubtarefaTexto?: string;
  editandoSubtarefaId?: number | null;
  textoEdicaoSubtarefa?: string;
  onToggleAdicionarSubtarefa?: (id: number) => void;
  onAdicionarSubtarefa?: (taskId: number) => void;
  onCancelarSubtarefa?: () => void;
  onNovaSubtarefaChange?: (texto: string) => void;
  onToggleSubtarefa?: (id: number) => void;
  onEditSubtarefa?: (id: number, titulo: string) => void;
  onSaveSubtarefa?: (id: number) => void;
  onDeleteSubtarefa?: (id: number) => void;
  onTextoEdicaoSubtarefaChange?: (texto: string) => void;
}

export function TarefaColuna({
  tarefas,
  editandoId,
  textoEdicao,
  onTextoEdicaoChange,
  onToggle,
  onEdit,
  onSave,
  onDelete,
  adicionandoSubtarefaEm,
  novaSubtarefaTexto,
  editandoSubtarefaId,
  textoEdicaoSubtarefa,
  onToggleAdicionarSubtarefa,
  onAdicionarSubtarefa,
  onCancelarSubtarefa,
  onNovaSubtarefaChange,
  onToggleSubtarefa,
  onEditSubtarefa,
  onSaveSubtarefa,
  onDeleteSubtarefa,
  onTextoEdicaoSubtarefaChange,
}: TarefaColunaProps) {
  return (
    <div className="space-y-3">
      {tarefas.map((tarefa) => (
        <TarefaItem
          key={tarefa.id}
          id={tarefa.id}
          titulo={tarefa.titulo}
          concluida={tarefa.concluida}
          created_at={tarefa.created_at}
          editando={editandoId === tarefa.id}
          textoEdicao={textoEdicao}
          subtarefas={tarefa.subtarefas?.map((sub) => ({
            ...sub,
            editando: editandoSubtarefaId === sub.id,
          }))}
          adicionandoSubtarefa={adicionandoSubtarefaEm === tarefa.id}
          novaSubtarefaTexto={novaSubtarefaTexto}
          onToggle={onToggle}
          onEdit={onEdit}
          onSave={onSave}
          onDelete={onDelete}
          onTextoEdicaoChange={onTextoEdicaoChange}
          textoEdicaoSubtarefa={textoEdicaoSubtarefa}
          onToggleSubtarefa={onToggleSubtarefa}
          onEditSubtarefa={onEditSubtarefa}
          onSaveSubtarefa={onSaveSubtarefa}
          onDeleteSubtarefa={onDeleteSubtarefa}
          onTextoEdicaoSubtarefaChange={onTextoEdicaoSubtarefaChange}
          onToggleAdicionarSubtarefa={onToggleAdicionarSubtarefa}
          onAdicionarSubtarefa={onAdicionarSubtarefa}
          onCancelarSubtarefa={onCancelarSubtarefa}
          onNovaSubtarefaChange={onNovaSubtarefaChange}
        />
      ))}
    </div>
  );
}
