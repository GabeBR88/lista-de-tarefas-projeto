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

    if (!email || !senha) {
      return NextResponse.json(
        { erro: "E-mail e senha são obrigatórios." },
        { status: 400 },
      );
    }

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

    // Verificar primeiro se é senha temporária
    let senhaCorreta = false;
    let precisaResetar = false;

    if (usuario.temp_password) {
      // Verificar expiração
      if (usuario.temp_password_expires) {
        const expiracao = new Date(usuario.temp_password_expires);
        if (new Date() > expiracao) {
          return NextResponse.json(
            { erro: "Senha temporária expirada. Solicite uma nova." },
            { status: 401 },
          );
        }
      }

      // Verificar se a senha digitada é a temporária
      senhaCorreta = await bcrypt.compare(senha, usuario.temp_password);
      if (senhaCorreta) {
        precisaResetar = true;
      }
    }

    // Se não for a temporária, verificar senha normal
    if (!senhaCorreta) {
      senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    }

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

    const resposta = NextResponse.json(
      {
        mensagem: "Login realizado com sucesso!",
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          email: usuario.email,
        },
        precisaResetar,
      },
      { status: 200 },
    );

    resposta.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
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
