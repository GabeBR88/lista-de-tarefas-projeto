"use client";

import { InputIcone } from "@/components/Input";
import { BotaoPadrao } from "@/components/Button";

interface CampoAdicionarTarefaProps {
  valor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdicionar: () => void;
  onCancelar: () => void;
}

export function CampoAdicionarTarefa({
  valor,
  onChange,
  onAdicionar,
  onCancelar,
}: CampoAdicionarTarefaProps) {
  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <InputIcone
            texto="Nova Tarefa"
            tipo="text"
            placeholder="Digite sua nova tarefa..."
            icone="bi bi-plus-circle"
            valor={valor}
            required={false}
            onChange={onChange}
            onKeyDown={(e) => e.key === "Enter" && onAdicionar()}
          />
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancelar}
            className="cursor-pointer rounded-full border-2 border-gray-300 px-6 py-3 font-medium text-gray-600 transition-all hover:border-gray-400 hover:text-gray-800"
          >
            Cancelar
          </button>
          <BotaoPadrao
            texto="Adicionar"
            icon="bi bi-plus-lg"
            tipo="button"
            onClick={onAdicionar}
          />
        </div>
      </div>
    </div>
  );
}
