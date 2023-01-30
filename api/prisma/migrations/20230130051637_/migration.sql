-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "avatar" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "osc" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "sigla" TEXT NOT NULL,
    "data_Fundacao" DATETIME NOT NULL,
    "publico_Alvo" TEXT NOT NULL,
    "missao" TEXT NOT NULL,
    "visao" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "enderecos" (
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

-- CreateTable
CREATE TABLE "governanca" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "id_fk_osc" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "governanca_id_fk_osc_fkey" FOREIGN KEY ("id_fk_osc") REFERENCES "osc" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "projetos" (
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
    "enderecosId" TEXT NOT NULL,
    CONSTRAINT "projetos_oSCId_fkey" FOREIGN KEY ("oSCId") REFERENCES "osc" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "projetos_enderecosId_fkey" FOREIGN KEY ("enderecosId") REFERENCES "enderecos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "beneficiarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "data_Nascimento" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "cor_Declarada" TEXT NOT NULL,
    "is_Menor" BOOLEAN NOT NULL,
    "responsavel_Menor" TEXT NOT NULL,
    "profissao" TEXT NOT NULL,
    "renda_Mensal" TEXT NOT NULL,
    "avatar" TEXT,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ended_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projetosId" TEXT,
    CONSTRAINT "beneficiarios_projetosId_fkey" FOREIGN KEY ("projetosId") REFERENCES "projetos" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "planejamentos" (
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

-- CreateTable
CREATE TABLE "tokenbl" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "token" TEXT NOT NULL,
    "created_At" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_fk_osc_key" ON "enderecos"("id_fk_osc");

-- CreateIndex
CREATE UNIQUE INDEX "enderecos_id_fk_beneficiario_key" ON "enderecos"("id_fk_beneficiario");
