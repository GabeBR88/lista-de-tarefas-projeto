"use client";

import { BotaoPadrao } from "@/components/button";
import { InputIcone } from "@/components/input";
import Link from "next/link";
import { useState } from "react";

export default function CadastroPage() {
  // Impedir colar no campo de confirmar senha
  const [mensagem, setMensagem] = useState("");

  const impedirColar = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setMensagem("Não é permitido colar neste campo");
    setTimeout(() => setMensagem(""), 3000); // A mensagem fica aparecendo na tela por 3 segundos
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-(--color-primary) to-(--color-accent) p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="p-8 md:p-12">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Criar Conta</h1>
          <p className="mb-8 text-gray-600">
            Preencha os dados para se cadastrar
          </p>

          <form className="space-y-5">
            {/* Nome */}
            <InputIcone
              texto="Nome"
              tipo="text"
              placeholder="Digite seu nome"
              icone="bi bi-person"
              required
            />

            {/* Sobrenome */}
            <InputIcone
              texto="Sobrenome"
              tipo="text"
              placeholder="Digite seu sobrenome"
              icone="bi bi-person"
              required
            />

            {/* E-mail */}
            <InputIcone
              texto="E-mail"
              tipo="email"
              placeholder="Digite seu e-mail"
              icone="bi bi-envelope"
              required
            />

            {/* Senha */}
            <InputIcone
              texto="Senha"
              tipo="password"
              placeholder="Digite sua senha"
              icone="bi bi-lock"
              mostrarOlho 
              required
            />

            {/* Confirmar Senha */}
            <InputIcone
              texto="Confirmar Senha"
              tipo="password"
              placeholder="Confirme sua senha"
              icone="bi bi-lock-fill"
              mostrarOlho
              onPaste={impedirColar}
              required
            />

            {/* Mensagem de erro */}
            {mensagem && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-center text-red-600">
                {mensagem}
              </div>
            )}

            {/* Botão Cadastrar */}
            <BotaoPadrao
              texto="Cadastrar"
              icon="bi bi-person-plus"
              tipo="submit"
            />

            {/* Link para login */}
            <p className="text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="font-medium text-(--color-primary) hover:text-(--color-accent) hover:underline transition-colors"
              >
                Fazer login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
