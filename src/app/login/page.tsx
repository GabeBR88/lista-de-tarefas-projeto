import { BotaoPadrao } from "@/components/button";
import { InputIcone } from "@/components/input";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-(--color-primary) to-(--color-accent) p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Lado esquerdo - Banner com imagem */}
        <div
          className="relative hidden bg-cover bg-center p-12 md:flex md:w-1/2 md:flex-col md:justify-center"
          style={{ backgroundImage: "url('/images/fundo.jpg')" }}
        >
          {/* Overlay com cores da paleta */}
          <div className="absolute inset-0 bg-linear-to-br from-(--color-primary)/85 to-(--color-accent)/75"></div>

          {/* Conteúdo do banner */}
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
          {/* Título mobile */}
          <div className="mb-8 text-center md:hidden">
            <h1 className="text-2xl font-bold text-gray-800">
              Lista de Tarefas
            </h1>
            <p className="mt-2 text-gray-600">Mantenha-se organizado</p>
          </div>

          <h2 className="mb-8 text-3xl font-bold text-gray-800">Login</h2>

          <form className="space-y-5">
            {/* Campo Email */}
            <div>
              <div className="relative">
                <InputIcone
                  texto="E-mail"
                  tipo="email"
                  placeholder="Digite seu e-mail"
                  icone="bi bi-envelope"
                  required
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div>
              <div className="relative">
                <InputIcone
                  texto="Senha"
                  tipo="password"
                  placeholder="Digite sua senha"
                  icone="bi bi-lock"
                  mostrarOlho
                  required
                />
              </div>
            </div>

            {/* Esqueci minha senha */}
            <div className="text-right">
              <Link
                href="/recuperar-senha"
                className="text-sm text-(--color-primary) hover:text-(--color-accent) hover:underline transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>

            {/* Botão Entrar */}
            <BotaoPadrao
              texto="Entrar"
              icon="bi bi-box-arrow-in-right"
              tipo="submit"
            />

            {/* Link para cadastro */}
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
