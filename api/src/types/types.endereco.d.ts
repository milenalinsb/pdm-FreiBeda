export interface IEndereco {
    logradouro: string
    numero: string
    cep: string
    bairro: string
    cidade: string
    estado: string
    referencia: string
}

export interface IEnderecoExiste {
    logradouro: string
    cep: string
}

export interface IAtualizarEndereco {
    id: string
    logradouro: string
    numero: string
    cep: string
    bairro: string
    cidade: string
    estado: string
    referencia: string
}
