
export interface IResumoExiste {
    nome: string;
};

export interface IResumoProjeto {
    nome: string;
    impacto: string;
    objetivo: string;
    atividades: string;
    responsavel: string;
    valor: string;
    patrocinadores: string;
};

export interface IAtualizarResumoProjeto {
    id: string;
    nome: string;
    impacto: string;
    objetivo: string;
    atividades: string;
    responsavel: string;
    valor: string;
    patrocinadores: string;
};