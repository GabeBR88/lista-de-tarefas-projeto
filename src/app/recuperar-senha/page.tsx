"use client";

import { BotaoPadrao } from "@/components/Button";
import { InputIcone } from "@/components/Input";
import Link from "next/link";
import { useState } from "react";

export default function RecuperarSenhaPage() {
  const [email, setEmail] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!email) {
      setErro("Digite seu e-mail.");
      return;
    }

    if (!emailValido) {
      setErro("Formato de e-mail inválido.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/auth/recuperar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro);
        return;
      }

      setSucesso(dados.mensagem);
      setEmail("");
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-(--color-primary) to-(--color-accent) p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="p-8 md:p-12">
          {/* Ícone de cadeado */}
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-(--color-primary)/10">
              <i className="bi bi-lock-fill text-3xl text-(--color-primary)"></i>
            </div>
          </div>

          <h1 className="mb-2 text-center text-2xl font-bold text-gray-800">
            Esqueci minha senha
          </h1>
          <p className="mb-8 text-center text-gray-600">
            Digite seu e-mail cadastrado para receber uma senha temporária.
          </p>

          {/* Mensagem de erro */}
          {erro && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <i className="bi bi-exclamation-circle mr-2"></i>
              {erro}
            </div>
          )}

          {/* Mensagem de sucesso */}
          {sucesso && (
            <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
              <i className="bi bi-check-circle mr-2"></i>
              {sucesso}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputIcone
              texto="E-mail"
              tipo="email"
              placeholder="Digite seu e-mail cadastrado"
              icone="bi bi-envelope"
              valor={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErro("");
                setSucesso("");
              }}
              required
            />

            <BotaoPadrao
              texto={carregando ? "Enviando..." : "Enviar senha temporária"}
              icon="bi bi-send"
              tipo="submit"
            />

            <div className="text-center">
              <Link
                href="/login"
                className="text-sm text-(--color-primary) hover:text-(--color-accent) hover:underline transition-colors"
              >
                <i className="bi bi-arrow-left mr-1"></i>
                Voltar para o login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
