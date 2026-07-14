import mysql from "mysql2/promise";

export async function query(sql: string, values?: (string | number | boolean | null)[]): Promise<unknown> {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows] = await connection.execute(sql, values);
  connection.end();
  return rows;
}
