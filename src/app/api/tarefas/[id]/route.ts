import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromToken } from "@/lib/auth";


// PUT - Atualizar tarefa
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

    // Verificar se a tarefa pertence ao usuário
    const tarefas = await query(
      "SELECT id FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (!Array.isArray(tarefas) || tarefas.length === 0) {
      return NextResponse.json(
        { erro: "Tarefa não encontrada." },
        { status: 404 },
      );
    }

    // Atualizar
    if (titulo !== undefined) {
      await query("UPDATE tasks SET titulo = ? WHERE id = ?", [
        titulo.trim(),
        id,
      ]);
    }

    if (concluida !== undefined) {
      await query("UPDATE tasks SET concluida = ? WHERE id = ?", [
        concluida,
        id,
      ]);
    }

    const tarefaAtualizada = await query(
      "SELECT id, user_id, titulo, concluida, created_at FROM tasks WHERE id = ?",
      [id],
    );

    return NextResponse.json(tarefaAtualizada, { status: 200 });
  } catch (erro) {
    console.error("Erro ao atualizar tarefa:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}

// DELETE - Excluir tarefa
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

    // Verificar se a tarefa pertence ao usuário
    const tarefas = await query(
      "SELECT id FROM tasks WHERE id = ? AND user_id = ?",
      [id, userId],
    );

    if (!Array.isArray(tarefas) || tarefas.length === 0) {
      return NextResponse.json(
        { erro: "Tarefa não encontrada." },
        { status: 404 },
      );
    }

    await query("DELETE FROM tasks WHERE id = ?", [id]);

    return NextResponse.json({ mensagem: "Tarefa excluída." }, { status: 200 });
  } catch (erro) {
    console.error("Erro ao excluir tarefa:", erro);
    return NextResponse.json({ erro: "Erro interno." }, { status: 500 });
  }
}
