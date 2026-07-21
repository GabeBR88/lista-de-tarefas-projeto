import { query } from "@/lib/db";
import { enviarEmail } from "@/lib/email";
import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";

type Usuario = {
  id: number;
  nome: string;
  email: string;
};

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { erro: "E-mail é obrigatório." },
        { status: 400 },
      );
    }

    const usuarios = await query(
      "SELECT id, nome, email FROM users WHERE email = ?",
      [email.toLowerCase().trim()],
    );

    const usuario = Array.isArray(usuarios) ? (usuarios[0] as Usuario) : null;

    if (!usuario) {
      return NextResponse.json(
        { erro: "E-mail não encontrado." },
        { status: 404 },
      );
    }

    // Gerar senha temporária
    const senhaTemporaria = crypto.randomBytes(4).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senhaTemporaria, salt);

    const expiracao = new Date();
    expiracao.setHours(expiracao.getHours() + 1);
    const expiracaoFormatada = expiracao
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    await query(
      "UPDATE users SET temp_password = ?, temp_password_expires = ? WHERE id = ?",
      [senhaHash, expiracaoFormatada, usuario.id],
    );

    // Enviar e-mail
    const emailEnviado = await enviarEmail({
      para: usuario.email,
      assunto: "Recuperação de Senha - Lista de Tarefas",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #559de5;">Recuperação de Senha</h2>
          <p>Olá <strong>${usuario.nome}</strong>,</p>
          <p>Sua senha temporária é:</p>
          <div style="background: #f0f4ff; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #5c5dea; letter-spacing: 3px;">${senhaTemporaria}</span>
          </div>
          <p>⚠️ Esta senha expira em <strong>1 hora</strong>.</p>
        </div>
      `,
    });

    if (!emailEnviado) {
      console.log(`📧 Fallback - Senha: ${senhaTemporaria}`);
    }

    return NextResponse.json(
      { mensagem: "Senha temporária enviada para o seu e-mail!" },
      { status: 200 },
    );
  } catch (erro) {
    console.error("Erro:", erro);
    return NextResponse.json(
      { erro: "Erro interno do servidor." },
      { status: 500 },
    );
  }
}
