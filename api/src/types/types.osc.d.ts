
export interface ICadastrarOsc{
    nome: string;
    sigla: string;
    data_Fundacao: Date;
    publico_Alvo: string;
    missao: string;
    visao: string;
};

export interface IAtualizarOSC{
    id: string;
    nome: string;
    sigla: string;
    data_Fundacao: Date;
    publico_Alvo: string;
    missao: string;
    visao: string;
};

export interface IExisteOSC {
    nome: string;
    sigla: string;
};