/*
  Warnings:

  - You are about to drop the column `id_fk_usuario` on the `tokenbl` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tokenbl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_tokenbl" ("created_At", "id", "token") SELECT "created_At", "id", "token" FROM "tokenbl";
DROP TABLE "tokenbl";
ALTER TABLE "new_tokenbl" RENAME TO "tokenbl";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
