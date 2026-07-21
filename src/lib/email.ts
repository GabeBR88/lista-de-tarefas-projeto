import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface EnviarEmailProps {
  para: string;
  assunto: string;
  html: string;
}

export async function enviarEmail({ para, assunto, html }: EnviarEmailProps) {
  try {
    await transporter.sendMail({
      from: `"Lista de Tarefas" <${process.env.EMAIL_FROM}>`,
      to: para,
      subject: assunto,
      html,
    });
    console.log(`✅ E-mail enviado para ${para}`);
    return true;
  } catch (erro) {
    console.error("Erro ao enviar e-mail:", erro);
    return false;
  }
}
