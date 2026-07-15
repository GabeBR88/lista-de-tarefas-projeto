"use client";

import { TarefaItem } from "@/components/TarefaItem";

interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
  created_at: string;
}

interface TarefaColunaProps {
  tarefas: Tarefa[];
  editandoId: number | null;
  textoEdicao: string;
  onTextoEdicaoChange: (texto: string) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, titulo: string) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
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
          onToggle={onToggle}
          onEdit={onEdit}
          onSave={onSave}
          onDelete={onDelete}
          onTextoEdicaoChange={onTextoEdicaoChange}
        />
      ))}
    </div>
  );
}
