export interface IUsuario {
    username: string
    email: string
    senha: string
}

export interface IEmailUsuario {
    email: string
}

export interface IAutenticarUsuario {
    email: string
    senha: string
}

export interface IAtualizarUsuario {
    id: string
    dados: IDadosAtualizados
}

interface IDadosAtualizados {
    username?: string
    email?: string
    senha?: string
    avatar?: string
}

export interface IEmailNomeUsuario {
    username: string
    email: string
    senha?: string
}
