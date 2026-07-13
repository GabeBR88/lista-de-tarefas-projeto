"use client";

import { InputIconeProps } from "@/types/interfaces";
import { useState } from "react";

export function InputIcone({
  texto,
  tipo,
  placeholder,
  icone,
  valor,
  required,
  mostrarOlho,
  onPaste,
}: InputIconeProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const tipoInput = mostrarOlho && mostrarSenha ? "text" : tipo;

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {texto}
      </label>
      <div className="relative">
        {/* Ícone da esquerda */}
        <i
          className={`${icone} absolute left-3 top-1/2 -translate-y-1/2 text-gray-400`}
        ></i>

        {/* Input */}
        <input
          type={tipoInput}
          placeholder={placeholder}
          required={required}
          value={valor}
          onPaste={onPaste}
          className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-10 text-gray-700 transition-colors focus:border-(--color-primary) focus:outline-none focus:ring-2 focus:ring-(--color-primary)/20"
        />

        {/* Ícone para visualizar a senha ao clicar */}
        {mostrarOlho && (
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            tabIndex={-1}
          >
            <i className={`bi ${mostrarSenha ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        )}
      </div>
    </div>
  );
}
