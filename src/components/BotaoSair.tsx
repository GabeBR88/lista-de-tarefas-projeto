"use client";

import { useRouter } from "next/navigation";

export function BotaoSair() {
  const router = useRouter();

  const handleSair = () => {
    // Remove o cookie de autenticação
    document.cookie = "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // Redireciona para a página inicial
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={handleSair}
      className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-red-300 px-5 py-2 text-sm font-medium text-red-500 transition-all duration-300 hover:bg-red-50 hover:border-red-400 hover:text-red-600"
    >
      <i className="bi bi-box-arrow-right"></i>
      Sair
    </button>
  );
}
