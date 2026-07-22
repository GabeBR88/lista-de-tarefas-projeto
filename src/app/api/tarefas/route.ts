import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";

// GET - Listar tarefas com subtarefas
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const tarefas = (await query(
      "SELECT id, user_id, titulo, concluida, created_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    )) as {
      id: number;
      user_id: number;
      titulo: string;
      concluida: boolean;
      created_at: string;
    }[];

    // Buscar subtarefas para cada tarefa
    const tarefasComSubtarefas = await Promise.all(
      tarefas.map(async (tarefa) => {
        const subtarefas = await query(
          "SELECT id, task_id, user_id, titulo, concluida, created_at FROM subtasks WHERE task_id = ? ORDER BY created_at ASC",
          [tarefa.id],
        );
        return { ...tarefa, subtarefas };
      }),
    );

    return NextResponse.json(tarefasComSubtarefas, { status: 200 });
  } catch (erro) {
    console.error("Erro ao listar tarefas:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}

// POST - Criar nova tarefa
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { titulo } = await request.json();

    if (!titulo || titulo.trim() === "") {
      return NextResponse.json(
        { erro: "Título é obrigatório." },
        { status: 400 },
      );
    }

    const resultado = (await query(
      "INSERT INTO tasks (user_id, titulo) VALUES (?, ?)",
      [userId, titulo.trim()],
    )) as { insertId: number };

    const novaTarefa = await query(
      "SELECT id, user_id, titulo, concluida, created_at FROM tasks WHERE id = ?",
      [resultado.insertId],
    );

    return NextResponse.json(novaTarefa, { status: 201 });
  } catch (erro) {
    console.error("Erro ao criar tarefa:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}
