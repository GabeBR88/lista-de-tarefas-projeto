import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lista_tarefas_secret_2026";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    const usuarios = await query(
      "SELECT id, nome, sobrenome, email FROM users WHERE id = ?",
      [decoded.id],
    );

    const usuario = Array.isArray(usuarios) ? usuarios[0] : null;

    if (!usuario) {
      return NextResponse.json(
        { erro: "Usuário não encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(usuario, { status: 200 });
  } catch {
    return NextResponse.json({ erro: "Não autorizado." }, { status: 401 });
  }
}
