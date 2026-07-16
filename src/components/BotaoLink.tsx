import Link from "next/link";

interface BotaoLinkProps {
  texto: string;
  href: string;
  variante?: "preenchido" | "outline" | "outlineCinza";
  externo?: boolean;
  className?: string;
  onClick?: () => void;
}

export function BotaoLink({
  texto,
  href,
  variante = "preenchido",
  externo = false,
  className = "",
  onClick,
}: BotaoLinkProps) {
  const base =
    "w-full sm:w-auto rounded-full px-8 py-3 text-center font-semibold transition-colors cursor-pointer inline-block";

  // Ele recebe a variante e retorna a classe correspondente do objeto estilos. Se a variante não for encontrada, ele retorna uma string vazia.
  const estilos = {
    preenchido: "bg-white text-(--color-primary) hover:bg-gray-100",
    outline: "border-2 border-white text-white hover:bg-white/10",
    outlineCinza:
      "border-2 border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-800",
  };

  const classes = `${base} ${estilos[variante]} ${className}`;

  if (externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {texto}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {texto}
      </button>
    );
  }

  return (
    <Link href={href} className={classes}>
      {texto}
    </Link>
  );
}
