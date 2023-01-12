-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_resumo_projetos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "impacto" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "atividades" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "patrocinadores" TEXT NOT NULL,
    "id_fk_projeto" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resumo_projetos_id_fk_projeto_fkey" FOREIGN KEY ("id_fk_projeto") REFERENCES "projetos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_resumo_projetos" ("atividades", "created_At", "ended_At", "id", "id_fk_projeto", "impacto", "modified_At", "nome", "objetivo", "patrocinadores", "responsavel", "valor") SELECT "atividades", "created_At", "ended_At", "id", "id_fk_projeto", "impacto", "modified_At", "nome", "objetivo", "patrocinadores", "responsavel", "valor" FROM "resumo_projetos";
DROP TABLE "resumo_projetos";
ALTER TABLE "new_resumo_projetos" RENAME TO "resumo_projetos";
CREATE UNIQUE INDEX "resumo_projetos_id_fk_projeto_key" ON "resumo_projetos"("id_fk_projeto");
CREATE TABLE "new_projetos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "id_fk_osc" TEXT,
    "id_fk_resumo_Projeto" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "projetos_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_projetos" ("created_At", "id", "id_fk_osc", "id_fk_resumo_Projeto", "modified_At") SELECT "created_At", "id", "id_fk_osc", "id_fk_resumo_Projeto", "modified_At" FROM "projetos";
DROP TABLE "projetos";
ALTER TABLE "new_projetos" RENAME TO "projetos";
CREATE TABLE "new_governanca" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "id_fk_osc" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "governanca_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_governanca" ("cargo", "created_At", "id", "id_fk_osc", "modified_At", "nome") SELECT "cargo", "created_At", "id", "id_fk_osc", "modified_At", "nome" FROM "governanca";
DROP TABLE "governanca";
ALTER TABLE "new_governanca" RENAME TO "governanca";
CREATE TABLE "new_enderecos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "referencia" TEXT NOT NULL,
    "id_fk_osc" TEXT,
    "id_fk_beneficiario" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "enderecos_id_fk_beneficiario_fkey" FOREIGN KEY ("id_fk_beneficiario") REFERENCES "beneficiarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "enderecos_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_enderecos" ("bairro", "cep", "cidade", "created_At", "estado", "id", "id_fk_beneficiario", "id_fk_osc", "logradouro", "modified_At", "numero", "referencia") SELECT "bairro", "cep", "cidade", "created_At", "estado", "id", "id_fk_beneficiario", "id_fk_osc", "logradouro", "modified_At", "numero", "referencia" FROM "enderecos";
DROP TABLE "enderecos";
ALTER TABLE "new_enderecos" RENAME TO "enderecos";
CREATE UNIQUE INDEX "enderecos_id_fk_osc_key" ON "enderecos"("id_fk_osc");
CREATE UNIQUE INDEX "enderecos_id_fk_beneficiario_key" ON "enderecos"("id_fk_beneficiario");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
