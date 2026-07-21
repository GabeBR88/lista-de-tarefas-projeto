import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lista_tarefas_secret_2026";

function getUserIdFromToken(request: NextRequest): number | null {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    return decoded.id;
  } catch {
    return null;
  }
}

// PUT - Atualizar subtarefa
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { id } = await params;
    const { titulo, concluida } = await request.json();

    const subtarefas = await query(
      "SELECT id FROM subtasks WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (!Array.isArray(subtarefas) || subtarefas.length === 0) {
      return NextResponse.json(
        { erro: "Subtarefa não encontrada." },
        { status: 404 },
      );
    }

    if (titulo !== undefined) {
      await query("UPDATE subtasks SET titulo = ? WHERE id = ?", [
        titulo.trim(),
        id,
      ]);
    }
    if (concluida !== undefined) {
      await query("UPDATE subtasks SET concluida = ? WHERE id = ?", [
        concluida,
        id,
      ]);
    }

    const atualizada = await query(
      "SELECT id, task_id, user_id, titulo, concluida, created_at FROM subtasks WHERE id = ?",
      [id],
    );

    return NextResponse.json(atualizada, { status: 200 });
  } catch (erro) {
    console.error("Erro ao atualizar subtarefa:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}

// DELETE - Excluir subtarefa
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const userId = getUserIdFromToken(request);
    if (!userId) {
      return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const { id } = await params;

    const subtarefas = await query(
      "SELECT id FROM subtasks WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (!Array.isArray(subtarefas) || subtarefas.length === 0) {
      return NextResponse.json(
        { erro: "Subtarefa não encontrada." },
        { status: 404 },
      );
    }

    await query("DELETE FROM subtasks WHERE id = ?", [id]);

    return NextResponse.json(
      { mensagem: "Subtarefa excluída." },
      { status: 200 },
    );
  } catch (erro) {
    console.error("Erro ao excluir subtarefa:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}
