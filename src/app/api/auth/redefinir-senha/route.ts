import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { email, senhaTemporaria, novaSenha } = await request.json();

    if (!email || !senhaTemporaria || !novaSenha) {
      return NextResponse.json(
        { erro: "Todos os campos são obrigatórios." },
        { status: 400 },
      );
    }

    // Validar nova senha
    const senhaRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,10}$/;
    if (!senhaRegex.test(novaSenha)) {
      return NextResponse.json(
        {
          erro: "A nova senha deve ter entre 6 e 10 caracteres e conter pelo menos um caractere especial.",
        },
        { status: 400 },
      );
    }

    // Buscar usuário
    const usuarios = await query(
      "SELECT id, senha, temp_password, temp_password_expires FROM users WHERE email = ?",
      [email.toLowerCase().trim()],
    );

    interface Usuario {
      id: string;
      senha: string;
      temp_password: string;
      temp_password_expires: string | null;
    }

    const usuario = Array.isArray(usuarios) ? (usuarios[0] as Usuario) : null;

    if (!usuario) {
      return NextResponse.json(
        { erro: "Usuário não encontrado." },
        { status: 404 },
      );
    }

    // Verificar se tem senha temporária
    if (!usuario.temp_password) {
      return NextResponse.json(
        { erro: "Nenhuma solicitação de recuperação encontrada." },
        { status: 400 },
      );
    }

    // Verificar expiração
    if (usuario.temp_password_expires) {
      const expiracao = new Date(usuario.temp_password_expires);
      if (new Date() > expiracao) {
        return NextResponse.json(
          { erro: "A senha temporária expirou. Solicite uma nova." },
          { status: 400 },
        );
      }
    }

    // Verificar senha temporária
    const senhaTempCorreta = await bcrypt.compare(
      senhaTemporaria,
      usuario.temp_password,
    );

    if (!senhaTempCorreta) {
      return NextResponse.json(
        { erro: "Senha temporária incorreta." },
        { status: 401 },
      );
    }

    // Hash da nova senha
    const salt = await bcrypt.genSalt(10);
    const novaSenhaHash = await bcrypt.hash(novaSenha, salt);

    // Atualizar senha e limpar campos temporários
    await query(
      "UPDATE users SET senha = ?, temp_password = NULL, temp_password_expires = NULL WHERE id = ?",
      [novaSenhaHash, usuario.id],
    );

    return NextResponse.json(
      { mensagem: "Senha alterada com sucesso!" },
      { status: 200 },
    );
  } catch (erro) {
    console.error("Erro ao redefinir senha:", erro);
    return NextResponse.json(
      { erro: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
