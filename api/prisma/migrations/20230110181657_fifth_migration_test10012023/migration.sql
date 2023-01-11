-- CreateTable
CREATE TABLE "tokenbl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "id_fk_usuario" TEXT NOT NULL,
    CONSTRAINT "tokenbl_id_fk_usuario_fkey" FOREIGN KEY ("id_fk_usuario") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
