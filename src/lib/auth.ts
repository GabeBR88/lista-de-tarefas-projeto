import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET não está configurado.");
  }
  return secret;
}

export function signJwt(payload: Record<string, unknown>): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "24h" });
}

export function verifyJwt(token: string): unknown {
  return jwt.verify(token, getJwtSecret());
}

export function getUserIdFromToken(request: NextRequest): number | null {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = verifyJwt(token) as { id: number };
    return decoded.id;
  } catch {
    return null;
  }
}
