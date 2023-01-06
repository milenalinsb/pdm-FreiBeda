-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_beneficiarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "data_Nascimento" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "cor_Declarada" TEXT NOT NULL,
    "is_Menor" BOOLEAN NOT NULL,
    "responsavel_Menor" TEXT NOT NULL,
    "profissao" TEXT NOT NULL,
    "renda_Mensal" TEXT NOT NULL,
    "id_fk_projeto" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "beneficiarios_id_fk_projeto_fkey" FOREIGN KEY ("id_fk_projeto") REFERENCES "projetos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_beneficiarios" ("cor_Declarada", "created_At", "data_Nascimento", "ended_At", "id", "id_fk_projeto", "is_Menor", "modified_At", "nome", "profissao", "renda_Mensal", "responsavel_Menor", "sexo") SELECT "cor_Declarada", "created_At", "data_Nascimento", "ended_At", "id", "id_fk_projeto", "is_Menor", "modified_At", "nome", "profissao", "renda_Mensal", "responsavel_Menor", "sexo" FROM "beneficiarios";
DROP TABLE "beneficiarios";
ALTER TABLE "new_beneficiarios" RENAME TO "beneficiarios";
CREATE TABLE "new_enderecos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "logradouro" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "referencia" TEXT NOT NULL,
    "id_fk_osc" INTEGER NOT NULL,
    "id_fk_beneficiario" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "enderecos_id_fk_beneficiario_fkey" FOREIGN KEY ("id_fk_beneficiario") REFERENCES "beneficiarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enderecos_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_enderecos" ("bairro", "cep", "cidade", "created_At", "estado", "id", "id_fk_beneficiario", "id_fk_osc", "logradouro", "modified_At", "numero", "referencia") SELECT "bairro", "cep", "cidade", "created_At", "estado", "id", "id_fk_beneficiario", "id_fk_osc", "logradouro", "modified_At", "numero", "referencia" FROM "enderecos";
DROP TABLE "enderecos";
ALTER TABLE "new_enderecos" RENAME TO "enderecos";
CREATE UNIQUE INDEX "enderecos_id_fk_osc_key" ON "enderecos"("id_fk_osc");
CREATE UNIQUE INDEX "enderecos_id_fk_beneficiario_key" ON "enderecos"("id_fk_beneficiario");
CREATE TABLE "new_usuarios" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_usuarios" ("created_At", "email", "id", "modified_At", "senha", "username") SELECT "created_At", "email", "id", "modified_At", "senha", "username" FROM "usuarios";
DROP TABLE "usuarios";
ALTER TABLE "new_usuarios" RENAME TO "usuarios";
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");
CREATE TABLE "new_planejamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "atividade" TEXT NOT NULL,
    "recursos" TEXT NOT NULL,
    "custo" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "id_fk_projeto" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "planejamentos_id_fk_projeto_fkey" FOREIGN KEY ("id_fk_projeto") REFERENCES "projetos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_planejamentos" ("atividade", "created_At", "custo", "ended_At", "id", "id_fk_projeto", "modified_At", "recursos", "responsavel", "status") SELECT "atividade", "created_At", "custo", "ended_At", "id", "id_fk_projeto", "modified_At", "recursos", "responsavel", "status" FROM "planejamentos";
DROP TABLE "planejamentos";
ALTER TABLE "new_planejamentos" RENAME TO "planejamentos";
CREATE TABLE "new_governanca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "id_fk_osc" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "governanca_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_governanca" ("cargo", "created_At", "id", "id_fk_osc", "modified_At", "nome") SELECT "cargo", "created_At", "id", "id_fk_osc", "modified_At", "nome" FROM "governanca";
DROP TABLE "governanca";
ALTER TABLE "new_governanca" RENAME TO "governanca";
CREATE TABLE "new_projetos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_fk_osc" INTEGER NOT NULL,
    "id_fk_resumo_Projeto" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "projetos_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_projetos" ("id", "id_fk_osc", "id_fk_resumo_Projeto") SELECT "id", "id_fk_osc", "id_fk_resumo_Projeto" FROM "projetos";
DROP TABLE "projetos";
ALTER TABLE "new_projetos" RENAME TO "projetos";
CREATE TABLE "new_osc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "data_Fundacao" DATETIME NOT NULL,
    "publico_Alvo" TEXT NOT NULL,
    "missao" TEXT NOT NULL,
    "visao" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_osc" ("created_At", "data_Fundacao", "id", "missao", "modified_At", "nome", "publico_Alvo", "sigla", "visao") SELECT "created_At", "data_Fundacao", "id", "missao", "modified_At", "nome", "publico_Alvo", "sigla", "visao" FROM "osc";
DROP TABLE "osc";
ALTER TABLE "new_osc" RENAME TO "osc";
CREATE TABLE "new_resumo_projetos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "impacto" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "atividades" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "patrocinadores" TEXT NOT NULL,
    "id_fk_projeto" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "resumo_projetos_id_fk_projeto_fkey" FOREIGN KEY ("id_fk_projeto") REFERENCES "projetos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_resumo_projetos" ("atividades", "created_At", "ended_At", "id", "id_fk_projeto", "impacto", "modified_At", "nome", "objetivo", "patrocinadores", "responsavel", "valor") SELECT "atividades", "created_At", "ended_At", "id", "id_fk_projeto", "impacto", "modified_At", "nome", "objetivo", "patrocinadores", "responsavel", "valor" FROM "resumo_projetos";
DROP TABLE "resumo_projetos";
ALTER TABLE "new_resumo_projetos" RENAME TO "resumo_projetos";
CREATE UNIQUE INDEX "resumo_projetos_id_fk_projeto_key" ON "resumo_projetos"("id_fk_projeto");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
