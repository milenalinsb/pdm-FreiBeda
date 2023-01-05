-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL,
    "modified_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "osc" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "data_Fundacao" DATETIME NOT NULL,
    "publico_Alvo" TEXT NOT NULL,
    "missao" TEXT NOT NULL,
    "visao" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL,
    "modified_At" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "enderecos" (
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
    "created_At" DATETIME NOT NULL,
    "modified_At" DATETIME NOT NULL,
    CONSTRAINT "enderecos_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "enderecos_id_fk_beneficiario_fkey" FOREIGN KEY ("id_fk_beneficiario") REFERENCES "beneficiarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "governanca" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "id_fk_osc" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL,
    "modified_At" DATETIME NOT NULL,
    CONSTRAINT "governanca_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "projetos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_fk_osc" INTEGER NOT NULL,
    "id_fk_resumo_Projeto" INTEGER NOT NULL,
    CONSTRAINT "projetos_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "resumo_projetos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "impacto" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "atividades" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "valor" TEXT NOT NULL,
    "patrocinadores" TEXT NOT NULL,
    "id_fk_projeto" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL,
    "ended_At" DATETIME NOT NULL,
    "modified_At" DATETIME NOT NULL,
    CONSTRAINT "resumo_projetos_id_fk_projeto_fkey" FOREIGN KEY ("id_fk_projeto") REFERENCES "projetos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "beneficiarios" (
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
    "created_At" DATETIME NOT NULL,
    "ended_At" DATETIME NOT NULL,
    "modified_At" DATETIME NOT NULL,
    CONSTRAINT "beneficiarios_id_fk_projeto_fkey" FOREIGN KEY ("id_fk_projeto") REFERENCES "projetos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "planejamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "atividade" TEXT NOT NULL,
    "recursos" TEXT NOT NULL,
    "custo" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "id_fk_projeto" INTEGER NOT NULL,
    "created_At" DATETIME NOT NULL,
    "ended_At" DATETIME NOT NULL,
    "modified_At" DATETIME NOT NULL,
    CONSTRAINT "planejamentos_id_fk_projeto_fkey" FOREIGN KEY ("id_fk_projeto") REFERENCES "projetos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_fk_osc_key" ON "enderecos"("id_fk_osc");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_fk_beneficiario_key" ON "enderecos"("id_fk_beneficiario");

-- CreateIndex
CREATE UNIQUE INDEX "resumo_projetos_id_fk_projeto_key" ON "resumo_projetos"("id_fk_projeto");
