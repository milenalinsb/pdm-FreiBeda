
export interface IUsuario{
    username: string;
    email: string;
    senha: string;
};

export interface IEmailUsuario{
    email: string;
};

export interface IAutenticarUsuario{
    email:string;
    senha: string;
};

export interface IAtualizarUsuario{
    id:string;
    username:string;
    email:string;
};

export interface IEmailNomeUsuario{
    username:string;
    email:string;
};