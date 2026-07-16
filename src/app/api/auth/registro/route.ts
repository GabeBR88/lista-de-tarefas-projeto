import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { nome, sobrenome, email, senha } = await request.json();

    // Validações
    if (!nome || !sobrenome || !email || !senha) {
      return NextResponse.json(
        { erro: "Todos os campos são obrigatórios." },
        { status: 400 },
      );
    }

    // Validar nome e sobrenome (mínimo 2 caracteres)
    if (nome.trim().lenght < 2 || sobrenome.trim().lenght < 2) {
      return NextResponse.json(
        { erro: "Nome e sobrenome devem ter pelo menos 2 caracteres." },
        { status: 400 },
      );
    }

    // Validar e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          erro: "A senha deve ter entre 6 a 10 caracteres e conter pelo menos um caractere especial.",
        },
        { status: 400 },
      );
    }

    // Verificar se e-mail já existe
    const usuariosExistentes = await query(
      "SELECT id FROM users WHERE email = ?",
      [email],
    );

    // Se e-mail já estiver cadastrado, avisa ao usuário
    if (Array.isArray(usuariosExistentes) && usuariosExistentes.length > 0) {
      return NextResponse.json(
        { erro: "Este e-mail já está cadastrado." },
        { status: 409 },
      );
    }

    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Inserir usuário
    await query(
      "INSERT INTO users (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)",
      [nome.trim(), sobrenome.trim(), email.toLowerCase().trim(), senhaHash],
    );

    return NextResponse.json(
      { mensagem: "Cadastro realizado com sucesso!" },
      { status: 201 },
    );
  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    return NextResponse.json(
      { erro: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
