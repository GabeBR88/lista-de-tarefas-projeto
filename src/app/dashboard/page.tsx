"use client";

import { useState } from "react";
import { Saudacao } from "@/components/Saudacao";
import { CampoAdicionarTarefa } from "@/components/CampoAdicionarTarefa";
import { ListaVazia } from "@/components/ListaVazia";
import { TarefaColuna } from "@/components/TarefaColuna";
import type { Tarefa } from "@/types/interfaces";
import { Footer } from "@/components/Footer";

export default function DashboardPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");
  const [mensagemLimite, setMensagemLimite] = useState(false);

  const nomeUsuario = "Gabriel";
  const LIMITE_TAREFAS = 20;

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === "") return;

    if (tarefas.length >= LIMITE_TAREFAS) {
      setMensagemLimite(true);
      setTimeout(() => setMensagemLimite(false), 3000);
      return;
    }

    const nova: Tarefa = {
      id: Date.now(),
      titulo: novaTarefa.trim(),
      concluida: false,
      created_at: new Date().toLocaleString("pt-BR"),
    };

    setTarefas([nova, ...tarefas]);
    setNovaTarefa("");
  };

  const cancelar = () => {
    setNovaTarefa("");
    setEditandoId(null);
    setTextoEdicao("");
  };

  const toggleConcluida = (id: number) => {
    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    );
  };

  const iniciarEdicao = (id: number, titulo: string) => {
    setEditandoId(id);
    setTextoEdicao(titulo);
  };

  const salvarEdicao = (id: number) => {
    // Garante que não salva vazio
    if (textoEdicao.trim() === "") return;

    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, titulo: textoEdicao.trim() } : t,
      ),
    );
    setEditandoId(null);
    setTextoEdicao("");
  };

  const excluirTarefa = (id: number) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  const limitePorColuna = 10;
  const precisaDuasColunas = tarefas.length > limitePorColuna;
  const colunaEsquerda = precisaDuasColunas
    ? tarefas.slice(0, limitePorColuna)
    : tarefas;
  const colunaDireita = precisaDuasColunas
    ? tarefas.slice(limitePorColuna, limitePorColuna * 2)
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Conteúdo principal com scroll */}
      <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Saudacao nome={nomeUsuario} />

        {/* Mensagem de limite */}
        {mensagemLimite && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-center">
            <p className="text-red-600 font-medium">
              <i className="bi bi-exclamation-triangle mr-2"></i>
              Você atingiu o limite de {LIMITE_TAREFAS} tarefas!
            </p>
            <p className="text-red-500 text-sm mt-1">
              Exclua alguma tarefa para adicionar mais.
            </p>
          </div>
        )}

        <CampoAdicionarTarefa
          valor={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          onAdicionar={adicionarTarefa}
          onCancelar={cancelar}
        />

        {/* Contador de tarefas */}
        {tarefas.length > 0 && (
          <p className="mb-4 text-sm text-gray-500">
            {tarefas.length} de {LIMITE_TAREFAS} tarefas
          </p>
        )}

        {/* Área de tarefas com scroll */}
        <div className="max-h-[50vh] overflow-y-auto rounded-2xl">
          {tarefas.length === 0 ? (
            <ListaVazia />
          ) : precisaDuasColunas ? (
            <div className="grid gap-6 lg:grid-cols-2">
              <TarefaColuna
                tarefas={colunaEsquerda}
                editandoId={editandoId}
                textoEdicao={textoEdicao}
                onTextoEdicaoChange={setTextoEdicao}
                onToggle={toggleConcluida}
                onEdit={iniciarEdicao}
                onSave={salvarEdicao}
                onDelete={excluirTarefa}
              />
              <TarefaColuna
                tarefas={colunaDireita}
                editandoId={editandoId}
                textoEdicao={textoEdicao}
                onTextoEdicaoChange={setTextoEdicao}
                onToggle={toggleConcluida}
                onEdit={iniciarEdicao}
                onSave={salvarEdicao}
                onDelete={excluirTarefa}
              />
            </div>
          ) : (
            <TarefaColuna
              tarefas={colunaEsquerda}
              editandoId={editandoId}
              textoEdicao={textoEdicao}
              onTextoEdicaoChange={setTextoEdicao}
              onToggle={toggleConcluida}
              onEdit={iniciarEdicao}
              onSave={salvarEdicao}
              onDelete={excluirTarefa}
            />
          )}
        </div>
      </div>

      {/* Footer fixo no final da tela do navegador */}
      <Footer />
    </div>
  );
}
