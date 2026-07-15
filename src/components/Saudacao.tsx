interface SaudacaoProps {
  nome: string;
}

export function Saudacao({ nome }: SaudacaoProps) {
  const hora = new Date().getHours();
  const saudacao =
    hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-800">
        {saudacao}, {nome}!
      </h1>
      <p className="mt-1 text-gray-600">
        Gerencie suas tarefas de forma simples e eficiente.
      </p>
    </div>
  );
}
