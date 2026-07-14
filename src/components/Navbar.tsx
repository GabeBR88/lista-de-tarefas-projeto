"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [menuAberto, setMenuAberto] = useState(false);

  const links = [
    { href: "#home", texto: "Home" },
    { href: "#funcionalidades", texto: "Funcionalidades" },
    { href: "#sobre", texto: "Sobre" },
    { href: "#contato", texto: "Contato" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold text-(--color-primary)"
        >
          <i className="bi bi-check2-square"></i>
          <span>Lista de Tarefas</span>
        </Link>

        {/* Links Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-(--color-primary) transition-colors"
            >
              {link.texto}
            </a>
          ))}
          <Link
            href="/login"
            className="rounded-full bg-(--color-primary) px-6 py-2 text-white hover:bg-(--color-primary-light) transition-colors"
          >
            Login
          </Link>
        </div>

        {/* Menu Mobile */}
        <button
          onClick={() => setMenuAberto(!menuAberto)}
          className="text-2xl text-gray-600 md:hidden"
          aria-label="Menu"
        >
          <i className={`bi ${menuAberto ? "bi-x-lg" : "bi-list"}`}></i>
        </button>
      </div>

      {/* Dropdown Mobile */}
      {menuAberto && (
        <div className="border-t bg-white px-4 pb-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuAberto(false)}
              className="block py-3 text-gray-600 hover:text-(--color-primary) transition-colors"
            >
              {link.texto}
            </a>
          ))}
          <Link
            href="/login"
            onClick={() => setMenuAberto(false)}
            className="mt-2 block rounded-full bg-(--color-primary) px-6 py-2 text-center text-white hover:bg-(--color-primary-light) transition-colors"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
