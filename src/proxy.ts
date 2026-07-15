import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const pathname = request.nextUrl.pathname;

  // Rotas públicas que não exigem autenticação
  const rotasPublicas = [
    "/",
    "/login",
    "/cadastro",
    "/recuperar-senha",
    "/dashboard", // RETIRAR DEPOIS DO TESTE, POIS O DASHBOARD É UMA ROTA PRIVADA
  ];

  // Se for rota pública, permite o acesso
  if (rotasPublicas.includes(pathname)) {
    return NextResponse.next();
  }

  // Se não houver token, redireciona para a página de login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Havendo token permite o acesso à rota
  return NextResponse.next();
}

// Rotas que o proxy deve interceptar, exceto as rotas públicas e arquivos estáticos
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
};
