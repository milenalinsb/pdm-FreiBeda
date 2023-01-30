/*
  Warnings:

  - You are about to drop the `resumo_projetos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `id_fk_osc` on the `projetos` table. All the data in the column will be lost.
  - You are about to drop the column `id_fk_resumo_Projeto` on the `projetos` table. All the data in the column will be lost.
  - Added the required column `atividades` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `impacto` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oSCId` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `objetivo` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `responsavel` to the `projetos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor` to the `projetos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "resumo_projetos_id_fk_projeto_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "resumo_projetos";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_beneficiarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "data_Nascimento" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "cor_Declarada" TEXT NOT NULL,
    "is_Menor" BOOLEAN NOT NULL,
    "responsavel_Menor" TEXT NOT NULL,
    "profissao" TEXT NOT NULL,
    "renda_Mensal" TEXT NOT NULL,
    "id_fk_projeto" TEXT NOT NULL,
    "avatar" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projetosId" TEXT,
    CONSTRAINT "beneficiarios_projetosId_fkey" FOREIGN KEY ("projetosId") REFERENCES "projetos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_beneficiarios" ("avatar", "cor_Declarada", "created_At", "data_Nascimento", "ended_At", "id", "id_fk_projeto", "is_Menor", "modified_At", "nome", "profissao", "renda_Mensal", "responsavel_Menor", "sexo") SELECT "avatar", "cor_Declarada", "created_At", "data_Nascimento", "ended_At", "id", "id_fk_projeto", "is_Menor", "modified_At", "nome", "profissao", "renda_Mensal", "responsavel_Menor", "sexo" FROM "beneficiarios";
DROP TABLE "beneficiarios";
ALTER TABLE "new_beneficiarios" RENAME TO "beneficiarios";
CREATE TABLE "new_projetos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "impacto" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "atividades" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "patrocinadores" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oSCId" TEXT NOT NULL,
    CONSTRAINT "projetos_oSCId_fkey" FOREIGN KEY ("oSCId") REFERENCES "osc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_projetos" ("created_At", "id", "modified_At") SELECT "created_At", "id", "modified_At" FROM "projetos";
DROP TABLE "projetos";
ALTER TABLE "new_projetos" RENAME TO "projetos";
CREATE TABLE "new_planejamentos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "atividade" TEXT NOT NULL,
    "recursos" TEXT NOT NULL,
    "custo" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "id_fk_projeto" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_planejamentos" ("atividade", "created_At", "custo", "ended_At", "id", "id_fk_projeto", "modified_At", "recursos", "responsavel", "status") SELECT "atividade", "created_At", "custo", "ended_At", "id", "id_fk_projeto", "modified_At", "recursos", "responsavel", "status" FROM "planejamentos";
DROP TABLE "planejamentos";
ALTER TABLE "new_planejamentos" RENAME TO "planejamentos";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
