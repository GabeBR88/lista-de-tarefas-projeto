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
