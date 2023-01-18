
export interface IPlanejamentoExiste{
    atividade: string;
};

export interface IPlanejamento {
    atividade:string;
    recursos: string;
    custo: string;
    responsavel: string;
    status: boolean;
    id_fk_projeto: string;
};

export interface IAtualizarPlanejamento {
    id: string;
    atividade:string;
    recursos: string;
    custo: string;
    responsavel: string;
    status: boolean;
    id_fk_projeto: string;
};