// src/app/login/page.tsx
"use client";

import { BotaoPadrao } from "@/components/Button";
import { InputIcone } from "@/components/Input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cadastroSucesso = searchParams.get("cadastro") === "sucesso";

  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleChange =
    (campo: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [campo]: e.target.value });
      setErro("");
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (!form.email || !form.senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro);
        return;
      }

      // Se precisar resetar senha, redireciona para reset
      if (dados.precisaResetar) {
        router.push("/nova-senha");
        return;
      }

      // Login normal → Dashboard
      router.push("/dashboard");
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-(--color-primary) to-(--color-accent) p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Lado esquerdo - Banner */}
        <div
          className="relative hidden bg-cover bg-center p-12 md:flex md:w-1/2 md:flex-col md:justify-center"
          style={{ backgroundImage: "url('/images/fundo.jpg')" }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-(--color-primary)/85 to-(--color-accent)/75"></div>
          <div className="relative z-10">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-(--foreground)">
              Bem-vindo à sua Lista de Tarefas online
            </h1>
            <p className="text-lg text-(--foreground)">
              Mantenha-se organizado em qualquer lugar, a qualquer hora.
            </p>
            <div className="mt-8 flex justify-center">
              <i className="bi bi-check2-square text-8xl text-(--foreground)/60"></i>
            </div>
          </div>
        </div>

        {/* Lado direito - Formulário */}
        <div className="w-full p-8 md:w-1/2 md:p-12">
          <div className="mb-8 text-center md:hidden">
            <h1 className="text-2xl font-bold text-gray-800">
              Lista de Tarefas
            </h1>
            <p className="mt-2 text-gray-600">Mantenha-se organizado</p>
          </div>

          <h2 className="mb-8 text-3xl font-bold text-gray-800">Login</h2>

          {/* Mensagem de cadastro realizado */}
          {cadastroSucesso && (
            <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
              Cadastro realizado com sucesso! Faça login.
            </div>
          )}

          {/* Mensagem de erro */}
          {erro && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {erro}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputIcone
              texto="E-mail"
              tipo="email"
              placeholder="Digite seu e-mail"
              icone="bi bi-envelope"
              valor={form.email}
              onChange={handleChange("email")}
              required
            />

            <InputIcone
              texto="Senha"
              tipo="password"
              placeholder="Digite sua senha"
              icone="bi bi-lock"
              valor={form.senha}
              onChange={handleChange("senha")}
              mostrarOlho
              required
            />

            <div className="text-right">
              <Link
                href="/recuperar-senha"
                className="text-sm text-(--color-primary) hover:text-(--color-accent) hover:underline transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>

            <BotaoPadrao
              texto={carregando ? "Entrando..." : "Entrar"}
              icon="bi bi-box-arrow-in-right"
              tipo="submit"
            />

            <p className="text-center text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link
                href="/cadastro"
                className="font-medium text-(--color-primary) hover:text-(--color-accent) hover:underline transition-colors"
              >
                Criar conta
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
