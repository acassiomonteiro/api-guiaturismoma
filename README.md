# API Guia Turismo Maranhão

Este projeto é uma aplicação back-end REST API desenvolvida com Node.js, TypeScript, Express e Prisma Sqlite.

## Dependências

### Principais

- **express**: Framework web para Node.js.
- **@prisma/client**: Cliente Prisma para interagir com o banco de dados.
- **Sqlite**: Cliente Sqlite para Node.js.

### Desenvolvimento

- **typescript**: Superset de JavaScript que adiciona tipagem estática.
- **ts-node**: Executor de TypeScript para Node.js.
- **@types/node**: Tipos TypeScript para Node.js.
- **@types/express**: Tipos TypeScript para Express.
- **nodemon**: Ferramenta que reinicia automaticamente o servidor quando arquivos são alterados.
- **prisma**: Ferramenta de ORM para Node.js e TypeScript.

## Scripts

### Inicialização do Servidor

Para iniciar o servidor em modo de desenvolvimento, utilize o comando:
**npm run dev**

Este comando utiliza o nodemon para monitorar alterações nos arquivos TypeScript e reiniciar o servidor automaticamente.

### Migrações do Banco de Dados

Para executar as migrações do banco de dados, utilize o comando:
**npx prisma migrate dev --name <nome-da-migracao>**

Este comando aplica as migrações definidas no esquema do Prisma ao banco de dados MySQL.

## Configuração do Banco de Dados

As credenciais do banco de dados MySQL devem ser configuradas no arquivo `.env` na raiz do projeto:

DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

Substitua `USER`, `PASSWORD`, `HOST`, `PORT` e `DATABASE` pelas informações correspondentes ao seu banco de dados MySQL.

## Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

- `prisma/schema.prisma`: Define o esquema do banco de dados.
- `src/index.ts`: Ponto de entrada da aplicação.
- `.env`: Arquivo de configuração das variáveis de ambiente.
- `package.json`: Arquivo de configuração do npm.
- `tsconfig.json`: Arquivo de configuração do TypeScript.
- `nodemon.json`: Arquivo de configuração do Nodemon.

## Executando a Aplicação

1. Instale as dependências:
  **npm install**


2. Execute as migrações do banco de dados:
  **npx prisma migrate dev --name init**

3. Inicie o servidor:
  **npm run dev**

