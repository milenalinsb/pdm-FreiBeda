export type IBeneficiario = {
    id: string,
    nome: string,
    data_Nascimento: Date,
    sexo: string,
    cor_Declarada: string,
    is_Menor: boolean,
    responsavel_Menor?: string,
    profissao: string,
    renda_Mensal: string,
    avatar?: string,
    id_fk_projeto?: string
}