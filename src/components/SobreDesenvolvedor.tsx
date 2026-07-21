import Image from "next/image";

export function SobreDesenvolvedor() {
  return (
    <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
      {/* Foto */}
      <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-full bg-gray-200">
        <Image
          src="/images/minha-foto.jpeg"
          alt="Gabriel Brito"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover"
        />
      </div>

      <div className="text-center md:text-left">
        <h3 className="mb-2 text-2xl font-bold text-gray-800">Gabriel Brito</h3>
        <p className="mb-4 text-(--color-primary) font-medium">
          Desenvolvedor Full Stack
        </p>
        <p className="mb-6 max-w-lg text-gray-600 leading-relaxed">
          Desenvolvedor apaixonado por tecnologia e por criar soluções que
          facilitam a vida das pessoas. Este projeto foi desenvolvido como parte
          do portfólio para demonstrar habilidades em React, Next.js,
          TypeScript, Node.js e MySQL.
        </p>

        <div className="flex justify-center gap-4 md:justify-start">
          <a
            href="https://github.com/GabeBR88"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <i className="bi bi-github text-xl"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/gabriel-brito-de-oliveira-371744121/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A66C2] text-white hover:bg-[#004182] transition-colors"
            aria-label="LinkedIn"
          >
            <i className="bi bi-linkedin text-xl"></i>
          </a>
          <a
            href="mailto:gabrielbrito.contato2017@gmail.com"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent) text-white hover:bg-(--color-primary) transition-colors"
            aria-label="Email"
          >
            <i className="bi bi-envelope-fill text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
