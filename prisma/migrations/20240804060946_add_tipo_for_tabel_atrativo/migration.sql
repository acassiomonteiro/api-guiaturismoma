/*
  Warnings:

  - Added the required column `tipo` to the `Atrativo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Atrativo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "description" TEXT,
    "dicas" TEXT,
    "destino_id" INTEGER NOT NULL,
    CONSTRAINT "Atrativo_destino_id_fkey" FOREIGN KEY ("destino_id") REFERENCES "Destino" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Atrativo" ("description", "destino_id", "dicas", "id", "name") SELECT "description", "destino_id", "dicas", "id", "name" FROM "Atrativo";
DROP TABLE "Atrativo";
ALTER TABLE "new_Atrativo" RENAME TO "Atrativo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
