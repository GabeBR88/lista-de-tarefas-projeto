import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";


// POST - Criar subtarefa
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { task_id, titulo } = await request.json();

    if (!task_id || !titulo || titulo.trim() === "") {
      return NextResponse.json(
        { erro: "Título é obrigatório." },
        { status: 400 },
      );
    }

    const resultado = (await query(
      "INSERT INTO subtasks (task_id, user_id, titulo) VALUES (?, ?, ?)",
      [task_id, userId, titulo.trim()],
    )) as { insertId: number };

    const subtarefa = await query(
      "SELECT id, task_id, user_id, titulo, concluida, created_at FROM subtasks WHERE id = ?",
      [resultado.insertId],
    );

    return NextResponse.json(subtarefa, { status: 201 });
  } catch (erro) {
    console.error("Erro ao criar subtarefa:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}
