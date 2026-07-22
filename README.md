# Lista de Tarefas

Projeto de portfólio de lista de tarefas desenvolvido com **Next.js**, **React**, **TypeScript**, **Tailwind CSS** e **MySQL**. A aplicação inclui funcionalidades de autenticação, cadastro, recuperação de senha, tarefas e subtarefas.

## Visão geral

A aplicação permite que cada usuário:

- cadastre-se e faça login;
- recupere a senha por e-mail;
- crie, edite, exclua e conclua tarefas;
- crie, edite, exclua e conclua subtarefas;
- visualize tarefas organizadas em dashboard;
- mantenha sessão protegida por JWT em cookie HTTP-only.

## Funcionalidades

- Autenticação com JWT e cookie HTTP-only
- Recuperação de senha por e-mail (Nodemailer)
- CRUD completo de tarefas
- Subtarefas com toggle expandir/recolher
- Design responsivo com Tailwind CSS
- Proteção de rotas com proxy (Next.js 16)
- Contador de progresso de subtarefas

## Tecnologias usadas

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- MySQL
- bcryptjs
- jsonwebtoken
- nodemailer

## Estrutura do projeto

- `src/app` - páginas, layouts e rotas do Next.js
- `src/app/api` - endpoints de API para autenticação, tarefas e subtarefas
- `src/components` - componentes reutilizáveis
- `src/lib/db.ts` - conexão com banco de dados MySQL
- `src/lib/email.ts` - envio de e-mail para recuperação de senha
- `src/types/interfaces.ts` - tipos TypeScript usados na aplicação

## Requisitos

- Node.js 20+
- npm ou yarn
- MySQL

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto com as variáveis abaixo:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco

JWT_SECRET=sua_chave_secreta

# Use uma chave longa e secreta. Não comite este arquivo no repositório.
# Exemplo: JWT_SECRET=uma_chave_super_secreta_aleatoria

EMAIL_HOST=smtp.exemplo.com
EMAIL_PORT=587
EMAIL_USER=seu_email@example.com
EMAIL_PASS=sua_senha_de_email
EMAIL_FROM=seu_email@example.com
```

> Para a recuperação de senha funcionar, é preciso ter um servidor SMTP configurado corretamente.

## Configuração do banco de dados

Execute o SQL abaixo no seu MySQL para criar o banco e as tabelas:

\`\`\`sql
CREATE DATABASE IF NOT EXISTS db_listatarefas;
USE db_listatarefas;

CREATE TABLE IF NOT EXISTS users (
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR(100) NOT NULL,
sobrenome VARCHAR(100) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
senha VARCHAR(255) NOT NULL,
temp_password VARCHAR(255) DEFAULT NULL,
temp_password_expires DATETIME DEFAULT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
titulo VARCHAR(255) NOT NULL,
concluida BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS subtasks (
id INT AUTO_INCREMENT PRIMARY KEY,
task_id INT NOT NULL,
user_id INT NOT NULL,
titulo VARCHAR(255) NOT NULL,
concluida BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
\`\`\`

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

3. Abra no navegador:

```text
http://localhost:3000
```

## Deploy

Para publicar a aplicação, configure as variáveis de ambiente no provedor de hospedagem e execute o build do Next.js.

```bash
npm run build
npm run start
```

Recomenda-se usar plataformas como **Vercel**, **Render** ou **Railway**, que suportam Next.js e permitem configuração fácil de variáveis de ambiente.

## Como usar

- Acesse `/cadastro` para criar uma conta;
- Acesse `/login` para entrar;
- Após o login, use o dashboard para gerenciar tarefas e subtarefas;
- O botão de recuperação de senha envia e-mail com senha temporária quando disponível;
- Funções de editar, concluir e excluir estão disponíveis nas tarefas e subtarefas.

## Observações importantes

- O backend valida nome, sobrenome, e-mail e senha no endpoint de cadastro.
- O login gera um token JWT armazenado em cookie HTTP-only.
- As rotas de tarefas e subtarefas são protegidas por autenticação.
- O envio de e-mail é implementado em `src/lib/email.ts`.

## Melhorias futuras

- adicionar testes automatizados;
- implementar deploy no Vercel ou outro provedor;
- melhorar o fluxo de mensagens e estados de erro no frontend;
- adicionar renovação de sessão / refresh token;
- incluir documentação de esquema de banco e migrações.

## Contato

- GitHub: [GabeBR88](https://github.com/GabeBR88)
- LinkedIn: [Gabriel Brito](https://www.linkedin.com/in/gabriel-brito-de-oliveira-371744121/)
