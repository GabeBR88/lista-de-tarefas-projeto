"use client";

import { useState, useEffect, useCallback } from "react";
import { Saudacao } from "@/components/Saudacao";
import { CampoAdicionarTarefa } from "@/components/CampoAdicionarTarefa";
import { ListaVazia } from "@/components/ListaVazia";
import { TarefaColuna } from "@/components/TarefaColuna";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/navigation";
import type {
  Tarefa,
  TarefaBackend,
  SubtarefaBackend,
} from "@/types/interfaces";

export default function DashboardPage() {
  const router = useRouter();
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");
  const [mensagemLimite, setMensagemLimite] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [nomeUsuario, setNomeUsuario] = useState("");

  // Subtarefas
  const [adicionandoSubtarefaEm, setAdicionandoSubtarefaEm] = useState<
    number | null
  >(null);
  const [novaSubtarefaTexto, setNovaSubtarefaTexto] = useState("");
  const [editandoSubtarefaId, setEditandoSubtarefaId] = useState<number | null>(
    null,
  );
  const [textoEdicaoSubtarefa, setTextoEdicaoSubtarefa] = useState("");

  const LIMITE_TAREFAS = 20;

  // Buscar tarefas do banco
  const carregarTarefas = useCallback(async () => {
    try {
      const resposta = await fetch("/api/tarefas");

      if (resposta.status === 401) {
        router.push("/login");
        return;
      }

      const dados = await resposta.json();

      const tarefasFormatadas: Tarefa[] = Array.isArray(dados)
        ? dados.map((t: TarefaBackend) => ({
            id: Number(t.id),
            user_id: Number(t.user_id),
            titulo: String(t.titulo ?? ""),
            concluida: Boolean(t.concluida),
            created_at: new Date(
              String(t.created_at ?? new Date()),
            ).toLocaleString("pt-BR"),
            subtarefas: Array.isArray(t.subtarefas)
              ? t.subtarefas.map((s: SubtarefaBackend) => ({
                  id: Number(s.id),
                  task_id: Number(s.task_id),
                  user_id: Number(s.user_id),
                  titulo: String(s.titulo ?? ""),
                  concluida: Boolean(s.concluida),
                  created_at: new Date(
                    String(s.created_at ?? new Date()),
                  ).toLocaleString("pt-BR"),
                }))
              : [],
          }))
        : [];

      setTarefas(tarefasFormatadas);
    } catch {
      console.error("Erro ao carregar tarefas");
    } finally {
      setCarregando(false);
    }
  }, [router]);

  // Buscar nome do usuário
  const carregarUsuario = useCallback(async () => {
    try {
      const resposta = await fetch("/api/auth/me");
      if (resposta.ok) {
        const dados = await resposta.json();
        setNomeUsuario(dados.nome || "Usuário");
      }
    } catch {
      setNomeUsuario("Usuário");
    }
  }, []);

  useEffect(() => {
    const inicializar = async () => {
      await carregarTarefas();
      await carregarUsuario();
    };
    void inicializar();
  }, [carregarTarefas, carregarUsuario]);

  // ==================== TAREFAS ====================

  const adicionarTarefa = async () => {
    if (novaTarefa.trim() === "") return;

    if (tarefas.length >= LIMITE_TAREFAS) {
      setMensagemLimite(true);
      setTimeout(() => setMensagemLimite(false), 3000);
      return;
    }

    try {
      const resposta = await fetch("/api/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: novaTarefa.trim() }),
      });

      if (resposta.status === 401) {
        router.push("/login");
        return;
      }

      const dados = await resposta.json();
      const novaTarefaBanco = Array.isArray(dados) ? dados[0] : dados;

      const tarefaFormatada: Tarefa = {
        id: Number(novaTarefaBanco.id),
        user_id: Number(novaTarefaBanco.user_id),
        titulo: String(novaTarefaBanco.titulo),
        concluida: Boolean(novaTarefaBanco.concluida),
        created_at: new Date(String(novaTarefaBanco.created_at)).toLocaleString(
          "pt-BR",
        ),
        subtarefas: [],
      };

      setTarefas([tarefaFormatada, ...tarefas]);
      setNovaTarefa("");
    } catch {
      console.error("Erro ao adicionar tarefa");
    }
  };

  const cancelar = () => {
    setNovaTarefa("");
    setEditandoId(null);
    setTextoEdicao("");
    setAdicionandoSubtarefaEm(null);
    setNovaSubtarefaTexto("");
    setEditandoSubtarefaId(null);
    setTextoEdicaoSubtarefa("");
  };

  const toggleConcluida = async (id: number) => {
    const tarefa = tarefas.find((t) => t.id === id);
    if (!tarefa) return;

    setTarefas(
      tarefas.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)),
    );

    try {
      await fetch(`/api/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concluida: !tarefa.concluida }),
      });
    } catch {
      setTarefas(
        tarefas.map((t) =>
          t.id === id ? { ...t, concluida: tarefa.concluida } : t,
        ),
      );
    }
  };

  const iniciarEdicao = (id: number, titulo: string) => {
    setEditandoId(id);
    setTextoEdicao(titulo);
  };

  const salvarEdicao = async (id: number) => {
    if (textoEdicao.trim() === "") return;

    const tituloAntigo = tarefas.find((t) => t.id === id)?.titulo || "";

    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, titulo: textoEdicao.trim() } : t,
      ),
    );
    setEditandoId(null);
    setTextoEdicao("");

    try {
      await fetch(`/api/tarefas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: textoEdicao.trim() }),
      });
    } catch {
      setTarefas(
        tarefas.map((t) => (t.id === id ? { ...t, titulo: tituloAntigo } : t)),
      );
    }
  };

  const excluirTarefa = async (id: number) => {
    const tarefasAntigas = [...tarefas];
    setTarefas(tarefas.filter((t) => t.id !== id));

    try {
      await fetch(`/api/tarefas/${id}`, { method: "DELETE" });
    } catch {
      setTarefas(tarefasAntigas);
    }
  };

  // ==================== SUBTAREFAS ====================

  const toggleAdicionarSubtarefa = (taskId: number) => {
    setAdicionandoSubtarefaEm(
      adicionandoSubtarefaEm === taskId ? null : taskId,
    );
    setNovaSubtarefaTexto("");
  };

  const adicionarSubtarefa = async (taskId: number) => {
    if (novaSubtarefaTexto.trim() === "") return;

    try {
      const resposta = await fetch("/api/subtarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_id: taskId,
          titulo: novaSubtarefaTexto.trim(),
        }),
      });

      if (!resposta.ok) return;

      const dados = await resposta.json();
      const novaSub = Array.isArray(dados) ? dados[0] : dados;

      setTarefas(
        tarefas.map((t) =>
          t.id === taskId
            ? {
                ...t,
                subtarefas: [
                  ...(t.subtarefas || []),
                  {
                    id: Number(novaSub.id),
                    task_id: Number(novaSub.task_id),
                    user_id: Number(novaSub.user_id),
                    titulo: String(novaSub.titulo),
                    concluida: Boolean(novaSub.concluida),
                    created_at: new Date(
                      String(novaSub.created_at),
                    ).toLocaleString("pt-BR"),
                  },
                ],
              }
            : t,
        ),
      );

      setNovaSubtarefaTexto("");
      setAdicionandoSubtarefaEm(null);
    } catch {
      console.error("Erro ao adicionar subtarefa");
    }
  };

  const toggleConcluidaSubtarefa = async (subId: number) => {
    const tarefa = tarefas.find((t) =>
      t.subtarefas?.some((s) => s.id === subId),
    );
    if (!tarefa) return;
    const subtarefa = tarefa.subtarefas?.find((s) => s.id === subId);
    if (!subtarefa) return;

    setTarefas(
      tarefas.map((t) =>
        t.id === tarefa.id
          ? {
              ...t,
              subtarefas: t.subtarefas?.map((s) =>
                s.id === subId ? { ...s, concluida: !s.concluida } : s,
              ),
            }
          : t,
      ),
    );

    try {
      await fetch(`/api/subtarefas/${subId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concluida: !subtarefa.concluida }),
      });
    } catch {
      carregarTarefas();
    }
  };

  const editarSubtarefa = (subId: number, tituloAtual: string) => {
    setEditandoSubtarefaId(subId);
    setTextoEdicaoSubtarefa(tituloAtual);
  };

  const salvarSubtarefa = async (subId: number) => {
    if (textoEdicaoSubtarefa.trim() === "") return;

    setTarefas(
      tarefas.map((t) => ({
        ...t,
        subtarefas: t.subtarefas?.map((s) =>
          s.id === subId ? { ...s, titulo: textoEdicaoSubtarefa.trim() } : s,
        ),
      })),
    );

    setEditandoSubtarefaId(null);
    setTextoEdicaoSubtarefa("");

    try {
      await fetch(`/api/subtarefas/${subId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: textoEdicaoSubtarefa.trim() }),
      });
    } catch {
      carregarTarefas();
    }
  };

  const excluirSubtarefa = async (subId: number) => {
    const tarefa = tarefas.find((t) =>
      t.subtarefas?.some((s) => s.id === subId),
    );
    if (!tarefa) return;
    const subtarefasAntigas = [...(tarefa.subtarefas || [])];

    setTarefas(
      tarefas.map((t) =>
        t.id === tarefa.id
          ? { ...t, subtarefas: t.subtarefas?.filter((s) => s.id !== subId) }
          : t,
      ),
    );

    try {
      await fetch(`/api/subtarefas/${subId}`, { method: "DELETE" });
    } catch {
      setTarefas(
        tarefas.map((t) =>
          t.id === tarefa.id ? { ...t, subtarefas: subtarefasAntigas } : t,
        ),
      );
    }
  };

  // ==================== RENDER ====================

  const limitePorColuna = 10;
  const precisaDuasColunas = tarefas.length > limitePorColuna;
  const colunaEsquerda = precisaDuasColunas
    ? tarefas.slice(0, limitePorColuna)
    : tarefas;
  const colunaDireita = precisaDuasColunas
    ? tarefas.slice(limitePorColuna, limitePorColuna * 2)
    : [];

  if (carregando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <i className="bi bi-arrow-repeat text-4xl text-(--color-primary) animate-spin"></i>
          <p className="mt-4 text-gray-600">Carregando suas tarefas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Saudacao nome={nomeUsuario} />

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

        {tarefas.length > 0 && (
          <p className="mb-4 text-sm text-gray-500">
            {tarefas.length} de {LIMITE_TAREFAS} tarefas
          </p>
        )}

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
                adicionandoSubtarefaEm={adicionandoSubtarefaEm}
                novaSubtarefaTexto={novaSubtarefaTexto}
                editandoSubtarefaId={editandoSubtarefaId}
                textoEdicaoSubtarefa={textoEdicaoSubtarefa}
                onToggleAdicionarSubtarefa={toggleAdicionarSubtarefa}
                onAdicionarSubtarefa={adicionarSubtarefa}
                onCancelarSubtarefa={cancelar}
                onNovaSubtarefaChange={setNovaSubtarefaTexto}
                onToggleSubtarefa={toggleConcluidaSubtarefa}
                onEditSubtarefa={editarSubtarefa}
                onSaveSubtarefa={salvarSubtarefa}
                onDeleteSubtarefa={excluirSubtarefa}
                onTextoEdicaoSubtarefaChange={setTextoEdicaoSubtarefa}
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
                adicionandoSubtarefaEm={adicionandoSubtarefaEm}
                novaSubtarefaTexto={novaSubtarefaTexto}
                editandoSubtarefaId={editandoSubtarefaId}
                textoEdicaoSubtarefa={textoEdicaoSubtarefa}
                onToggleAdicionarSubtarefa={toggleAdicionarSubtarefa}
                onAdicionarSubtarefa={adicionarSubtarefa}
                onCancelarSubtarefa={cancelar}
                onNovaSubtarefaChange={setNovaSubtarefaTexto}
                onToggleSubtarefa={toggleConcluidaSubtarefa}
                onEditSubtarefa={editarSubtarefa}
                onSaveSubtarefa={salvarSubtarefa}
                onDeleteSubtarefa={excluirSubtarefa}
                onTextoEdicaoSubtarefaChange={setTextoEdicaoSubtarefa}
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
              adicionandoSubtarefaEm={adicionandoSubtarefaEm}
              novaSubtarefaTexto={novaSubtarefaTexto}
              editandoSubtarefaId={editandoSubtarefaId}
              textoEdicaoSubtarefa={textoEdicaoSubtarefa}
              onToggleAdicionarSubtarefa={toggleAdicionarSubtarefa}
              onAdicionarSubtarefa={adicionarSubtarefa}
              onCancelarSubtarefa={cancelar}
              onNovaSubtarefaChange={setNovaSubtarefaTexto}
              onToggleSubtarefa={toggleConcluidaSubtarefa}
              onEditSubtarefa={editarSubtarefa}
              onSaveSubtarefa={salvarSubtarefa}
              onDeleteSubtarefa={excluirSubtarefa}
              onTextoEdicaoSubtarefaChange={setTextoEdicaoSubtarefa}
            />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
