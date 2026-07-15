interface BotaoPadraoProps {
  icon?: string;
  texto: string;
  tipo?: "submit" | "button" | "reset";
  onClick?: () => void;
}

export function BotaoPadrao({ icon, texto, tipo, onClick }: BotaoPadraoProps) {
  return (
    <button
      type={tipo}
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border-none bg-(--color-accent-light) px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-(--color-primary-light) hover:shadow-lg"
    >
      <i className={`${icon}`}></i>
      {texto}
    </button>
  );
}
