import Link from "next/link";

interface CardContatoProps {
  icone: string;
  titulo: string;
  texto: string;
  href: string;
  externo?: boolean;
}

export function CardContato({
  icone,
  titulo,
  texto,
  href,
  externo,
}: CardContatoProps) {
  const className =
    "text-gray-600 hover:text-(--color-primary) transition-colors text-sm";

  return (
    <div className="text-center">
      <div className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-(--color-primary)/10">
        <i className={`${icone} text-2xl text-(--color-primary)`}></i>
      </div>
      <h3 className="mb-1 font-semibold text-gray-800">{titulo}</h3>
      {externo ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {texto}
        </a>
      ) : (
        <Link href={href} className={className}>
          {texto}
        </Link>
      )}
    </div>
  );
}
