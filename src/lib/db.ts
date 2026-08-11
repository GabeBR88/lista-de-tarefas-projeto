import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // máximo de conexões simultâneas
  queueLimit: 0, // fila infinita (0 = sem limite)
});

// Mantemos a função query para executar consultas SQL de forma assíncrona, retornando os resultados.
export async function query(
  sql: string,
  values?: (string | number | boolean | null)[],
): Promise<unknown> {
  const [rows] = await pool.execute(sql, values);
  return rows;
}
