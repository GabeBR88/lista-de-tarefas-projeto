import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "lista_tarefas_secret_2026";

type User = {
  id: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
  temp_password?: string | null;
  temp_password_expires?: string | null;
};

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    // Validações
    if (!email || !senha) {
      return NextResponse.json(
        { erro: "E-mail e senha são obrigatórios." },
        { status: 400 },
      );
    }

    // Buscar usuário
    const usuarios = await query(
      "SELECT id, nome, sobrenome, email, senha, temp_password, temp_password_expires FROM users WHERE email = ?",
      [email.toLowerCase().trim()],
    );

    const usuario = Array.isArray(usuarios) ? (usuarios[0] as User) : null;

    if (!usuario) {
      return NextResponse.json(
        { erro: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }

    // Verificar senha
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return NextResponse.json(
        { erro: "E-mail ou senha inválidos." },
        { status: 401 },
      );
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email,
      },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    // Criar resposta
    const resposta = NextResponse.json(
      {
        mensagem: "Login realizado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          email: usuario.email,
        },
        // Se for senha temporária, avisar frontend
        precisaResetar: usuario.temp_password ? true : false,
      },
      { status: 200 },
    );

    // Definir cookie com o token
    resposta.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 horas
    });

    return resposta;
  } catch (erro) {
    console.error("Erro ao fazer login:", erro);
    return NextResponse.json(
      { erro: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
