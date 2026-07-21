"use client";

import { BotaoPadrao } from "@/components/Button";
import { InputIcone } from "@/components/Input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cadastroSucesso = searchParams.get("cadastro") === "sucesso";

  const [form, setForm] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Modal de redefinição
  const [modalAberto, setModalAberto] = useState(false);
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState("");
  const [erroModal, setErroModal] = useState("");
  const [carregandoModal, setCarregandoModal] = useState(false);
  const [sucessoLogin, setSucessoLogin] = useState("");

  const senhaValida = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,10}$/.test(novaSenha);
  const senhasConferem = novaSenha === confirmarNovaSenha;

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

      if (dados.precisaResetar) {
        setModalAberto(true);
        return;
      }

      router.push("/dashboard");
    } catch {
      setErro("Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  };

  const handleRedefinirSenha = async (e: React.FormEvent) => {
    e.preventDefault();
    setErroModal("");

    if (!senhaValida) {
      setErroModal(
        "A senha deve ter entre 6 e 10 caracteres e conter pelo menos um caractere especial.",
      );
      return;
    }

    if (!senhasConferem) {
      setErroModal("As senhas não conferem.");
      return;
    }

    setCarregandoModal(true);

    try {
      const resposta = await fetch("/api/auth/redefinir-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          senhaTemporaria: form.senha,
          novaSenha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        setErroModal(dados.erro);
        return;
      }

      // Fechar modal e mostrar sucesso
      setModalAberto(false);
      setErro("");
      setSucessoLogin(
        "Senha alterada com sucesso! Faça login com sua nova senha.",
      );
      setForm({ email: form.email, senha: "" });
      setNovaSenha("");
      setConfirmarNovaSenha("");
    } catch {
      setErroModal("Erro ao conectar com o servidor.");
    } finally {
      setCarregandoModal(false);
    }
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-(--color-primary) to-(--color-accent) p-4">
        <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Banner esquerdo */}
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

          {/* Formulário */}
          <div className="w-full p-8 md:w-1/2 md:p-12">
            <div className="mb-8 text-center md:hidden">
              <h1 className="text-2xl font-bold text-gray-800">
                Lista de Tarefas
              </h1>
              <p className="mt-2 text-gray-600">Mantenha-se organizado</p>
            </div>

            <h2 className="mb-8 text-3xl font-bold text-gray-800">Login</h2>

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

            {/* Mensagem de sucesso */}
            {sucessoLogin && (
              <div className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-600">
                <i className="bi bi-check-circle mr-2"></i>
                {sucessoLogin}
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

      {/* Modal de Redefinição de Senha */}
      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <h2 className="mb-2 text-2xl font-bold text-gray-800">
              Redefinir Senha
            </h2>
            <p className="mb-6 text-gray-600">
              Sua senha temporária foi aceita. Crie uma nova senha.
            </p>

            {erroModal && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {erroModal}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleRedefinirSenha}>
              <InputIcone
                texto="Nova Senha"
                tipo="password"
                placeholder="Digite sua nova senha"
                icone="bi bi-lock"
                valor={novaSenha}
                onChange={(e) => {
                  setNovaSenha(e.target.value);
                  setErroModal("");
                }}
                mostrarOlho
                required
              />
              <p className="text-xs text-gray-500 -mt-2">
                Entre 6 e 10 caracteres, pelo menos 1 especial.
              </p>

              <InputIcone
                texto="Confirmar Nova Senha"
                tipo="password"
                placeholder="Confirme sua nova senha"
                icone="bi bi-lock-fill"
                valor={confirmarNovaSenha}
                onChange={(e) => {
                  setConfirmarNovaSenha(e.target.value);
                  setErroModal("");
                }}
                mostrarOlho
                required
              />

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalAberto(false)}
                  className="flex-1 cursor-pointer rounded-full border-2 border-gray-300 px-6 py-3 font-medium text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
                >
                  Cancelar
                </button>
                <div className="flex-1">
                  <BotaoPadrao
                    texto={carregandoModal ? "Salvando..." : "Salvar"}
                    icon="bi bi-check-lg"
                    tipo="submit"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <LoginForm />
    </Suspense>
  );
}
