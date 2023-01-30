interface IEnderecoID{
    id: string
}

export interface ICadastrarOsc{
    nome: string;
    sigla: string;
    data_Fundacao: Date;
    publico_Alvo: string;
    missao: string;
    visao: string;
    endereco:IEnderecoID
};

export interface IAtualizarOSC{
    id: string;
    dados:IAtualizarOSCData
};

export interface IAtualizarOSCData{
    nome?: string;
    sigla?: string;
    data_Fundacao?: Date;
    publico_Alvo?: string;
    missao?: string;
    visao?: string;
}

export interface IExisteOSC {
    nome: string;
    sigla: string;
};