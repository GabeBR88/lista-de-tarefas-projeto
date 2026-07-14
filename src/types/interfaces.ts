// Interface para as propriedades components > button.tsx
export interface BotaoPadraoProps {
  icon?: string;
  texto: string;
  tipo?: "submit" | "button" | "reset";
  onClick?: () => void;
}

// Interface para as propriedades components > input.tsx
export interface InputIconeProps {
  texto: string; // Texto do label
  tipo: "text" | "email" | "password";
  placeholder: string;
  icone: string;
  valor?: string;
  required?: boolean;
  mostrarOlho?: boolean;
  onPaste?: (e: React.ClipboardEvent) => void; // ← Novo!
}

// Interfaces para as propriedades components > SecaoTitulo.tsx
export interface SecaoTituloProps {
  titulo: string;
  subtitulo?: string;
}

// Interface para as propriedades components > CardFuncionalidade.tsx
export interface CardFuncionalidadeProps {
  icone: string;
  titulo: string;
  descricao: string;
}

// Interface para as propriedades components > CardContato.tsx
export interface CardContatoProps {
  icone: string;
  titulo: string;
  texto: string;
  href: string;
  externo?: boolean;
}
