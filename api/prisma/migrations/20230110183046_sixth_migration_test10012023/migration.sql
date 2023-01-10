-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tokenbl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "id_fk_usuario" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "tokenbl_id_fk_usuario_fkey" FOREIGN KEY ("id_fk_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tokenbl" ("id", "id_fk_usuario", "token") SELECT "id", "id_fk_usuario", "token" FROM "tokenbl";
DROP TABLE "tokenbl";
ALTER TABLE "new_tokenbl" RENAME TO "tokenbl";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
