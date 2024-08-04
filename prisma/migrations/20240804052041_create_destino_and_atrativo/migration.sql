/*
  Warnings:

  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Item";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Destino" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "localizacao" TEXT,
    "imagem" TEXT
);

-- CreateTable
CREATE TABLE "Atrativo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "dicas" TEXT,
    "destino_id" INTEGER NOT NULL,
    CONSTRAINT "Atrativo_destino_id_fkey" FOREIGN KEY ("destino_id") REFERENCES "Destino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
