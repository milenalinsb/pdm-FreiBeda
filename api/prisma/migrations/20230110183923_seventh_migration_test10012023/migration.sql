-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tokenbl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "id_fk_usuario" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_tokenbl" ("created_At", "id", "id_fk_usuario", "token") SELECT "created_At", "id", "id_fk_usuario", "token" FROM "tokenbl";
DROP TABLE "tokenbl";
ALTER TABLE "new_tokenbl" RENAME TO "tokenbl";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
