
export interface IBeneficiarioExiste {
    nome: string;
};

export interface IBeneficiario {
    nome: string;
    data_Nascimento: Date;
    sexo: string;
    cor_Declarada: string;
    is_Menor: boolean;
    responsavel_Menor: string;
    profissao: string;
    renda_Mensal: string;
    id_fk_projeto: string;
};

export interface IAtualizarBeneficiario {
    id: string;
    nome: string;
    data_Nascimento: Date;
    sexo: string;
    cor_Declarada: string;
    is_Menor: boolean;
    responsavel_Menor: string;
    profissao: string;
    renda_Mensal: string;
    id_fk_projeto: string;
};