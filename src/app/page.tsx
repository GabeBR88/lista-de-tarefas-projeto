import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SecaoTitulo } from "@/components/SecaoTitulo";
import { CardFuncionalidade } from "@/components/CardFuncionalidade";
import { CardContato } from "@/components/CardContato";
import { SobreDesenvolvedor } from "@/components/SobreDesenvolvedor";
import { BotaoLink } from "@/components/BotaoLink";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Lista de Tarefas",
};

export default function LandingPage() {
  const funcionalidades = [
    {
      icone: "bi bi-plus-circle",
      titulo: "Criar Tarefas",
      descricao: "Adicione novas tarefas rapidamente com apenas um clique.",
    },
    {
      icone: "bi bi-pencil-square",
      titulo: "Editar",
      descricao: "Atualize o texto das suas tarefas sempre que precisar.",
    },
    {
      icone: "bi bi-trash",
      titulo: "Excluir",
      descricao: "Remova tarefas concluídas ou que não são mais necessárias.",
    },
    {
      icone: "bi bi-check-circle",
      titulo: "Concluir",
      descricao: "Marque tarefas como concluídas e acompanhe seu progresso.",
    },
  ];

  const contatos = [
    {
      icone: "bi bi-envelope",
      titulo: "Email",
      texto: "gabrielbrito.contato2017@gmail.com",
      href: "mailto:gabrielbrito.contato2017@gmail.com",
    },
    {
      icone: "bi bi-github",
      titulo: "GitHub",
      texto: "/GabeBR88",
      href: "https://github.com/GabeBR88",
      externo: true,
    },
    {
      icone: "bi bi-linkedin",
      titulo: "LinkedIn",
      texto: "/Gabriel Brito",
      href: "https://www.linkedin.com/in/gabriel-brito-de-oliveira-371744121/",
      externo: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="bg-linear-to-br from-(--color-primary) to-(--color-accent) px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            Organize suas tarefas de forma simples e eficiente
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80 sm:text-xl">
            Uma ferramenta intuitiva para você gerenciar seu dia a dia, aumentar
            sua produtividade e nunca mais esquecer uma tarefa importante.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <BotaoLink
              texto="Comece agora"
              href="/cadastro"
              variante="preenchido"
            />
            <BotaoLink
              texto="Saiba mais"
              href="#funcionalidades"
              variante="outline"
            />
          </div>

          <div className="mt-16 flex justify-center">
            <div className="relative h-64 w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-sm sm:h-80 lg:h-96">
              <Image
                src="/images/fundo.jpg"
                alt="Dashboard"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section
        id="funcionalidades"
        className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <SecaoTitulo
            titulo="Funcionalidades"
            subtitulo="Tudo que você precisa para gerenciar suas tarefas"
          />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {funcionalidades.map((func) => (
              <CardFuncionalidade key={func.titulo} {...func} />
            ))}
          </div>
        </div>
      </section>

      {/* Sobre o desenvolvedor */}
      <section id="sobre" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SecaoTitulo titulo="Sobre o Desenvolvedor" />
          <SobreDesenvolvedor />
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="bg-gray-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SecaoTitulo
            titulo="Contato"
            subtitulo="Tem alguma dúvida ou sugestão? Entre em contato!"
          />
          <div className="mx-auto max-w-2xl">
            <div className="grid gap-8 sm:grid-cols-3">
              {contatos.map((contato) => (
                <CardContato key={contato.titulo} {...contato} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
