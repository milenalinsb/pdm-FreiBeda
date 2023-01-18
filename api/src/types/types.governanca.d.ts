
export interface IGovernanca {
    nome: string;
    cargo: string;
};

export interface IAtualizarGovernanca {
    id: string;
    dados:IAtualizarGovernancaData
};

export interface IAtualizarGovernancaData {
    id?: string;
    nome?: string;
    cargo?: string;
};