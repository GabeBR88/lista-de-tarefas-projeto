// src/app/cadastro/page.tsx
"use client";

import { BotaoPadrao } from "@/components/Button";
import { InputIcone } from "@/components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadastroPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: "",
    sobrenome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mostrarRequisitos, setMostrarRequisitos] = useState(false);

  // Validações em tempo real
  const senhaValida = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,10}$/.test(form.senha);
  const senhasConferem = form.senha === form.confirmarSenha;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const handleChange =
    (campo: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [campo]: e.target.value });
      setErro("");

      if (campo === "senha") {
        setMostrarRequisitos(true);
      }
    };

  const impedirColar = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    // Validações frontend
    if (form.nome.trim().length < 2 || form.sobrenome.trim().length < 2) {
      setErro("Nome e sobrenome devem ter pelo menos 2 caracteres.");
      return;
    }

    if (!emailValido) {
      setErro("Formato de e-mail inválido.");
      return;
    }

    if (!senhaValida) {
      setErro(
        "A senha deve ter entre 6 e 10 caracteres e conter pelo menos um caractere especial.",
      );
      return;
    }

    if (!senhasConferem) {
      setErro("As senhas não conferem.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("/api/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          sobrenome: form.sobrenome,
          email: form.email,
          senha: form.senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErro(dados.erro);
        return;
      }

      // Redirecionar para login
      router.push("/login?cadastro=sucesso");
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
          <h1 className="mb-2 text-3xl font-bold text-gray-800">Criar Conta</h1>
          <p className="mb-8 text-gray-600">
            Preencha os dados para se cadastrar
          </p>

          {/* Mensagem de erro */}
          {erro && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {erro}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputIcone
              texto="Nome"
              tipo="text"
              placeholder="Digite seu nome"
              icone="bi bi-person"
              valor={form.nome}
              onChange={handleChange("nome")}
              required
            />

            <InputIcone
              texto="Sobrenome"
              tipo="text"
              placeholder="Digite seu sobrenome"
              icone="bi bi-person"
              valor={form.sobrenome}
              onChange={handleChange("sobrenome")}
              required
            />

            <InputIcone
              texto="E-mail"
              tipo="email"
              placeholder="Digite seu e-mail"
              icone="bi bi-envelope"
              valor={form.email}
              onChange={handleChange("email")}
              required
            />
            {/* Feedback email */}
            {form.email && !emailValido && (
              <p className="text-xs text-red-500 -mt-3">
                Formato de e-mail inválido
              </p>
            )}

            <div>
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
              {/* Requisitos da senha */}
              {mostrarRequisitos && (
                <div className="mt-2 space-y-1">
                  <p
                    className={`text-xs ${form.senha.length >= 6 && form.senha.length <= 10 ? "text-green-500" : "text-red-500"}`}
                  >
                    {form.senha.length >= 6 && form.senha.length <= 10
                      ? "✅"
                      : "❌"}{" "}
                    Entre 6 e 10 caracteres
                  </p>
                  <p
                    className={`text-xs ${/[!@#$%^&*(),.?":{}|<>]/.test(form.senha) ? "text-green-500" : "text-red-500"}`}
                  >
                    {/[!@#$%^&*(),.?":{}|<>]/.test(form.senha) ? "✅" : "❌"}{" "}
                    Pelo menos 1 caractere especial
                  </p>
                </div>
              )}
            </div>

            <InputIcone
              texto="Confirmar Senha"
              tipo="password"
              placeholder="Confirme sua senha"
              icone="bi bi-lock-fill"
              valor={form.confirmarSenha}
              onChange={handleChange("confirmarSenha")}
              onPaste={impedirColar}
              mostrarOlho
              required
            />
            {/* Feedback confirmação */}
            {form.confirmarSenha && (
              <p
                className={`text-xs -mt-3 ${senhasConferem ? "text-green-500" : "text-red-500"}`}
              >
                {senhasConferem
                  ? "✅ Senhas conferem"
                  : "❌ Senhas não conferem"}
              </p>
            )}

            <BotaoPadrao
              texto={carregando ? "Cadastrando..." : "Cadastrar"}
              icon="bi bi-person-plus"
              tipo="submit"
            />

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
