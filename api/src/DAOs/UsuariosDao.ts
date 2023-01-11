import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export interface IUsuario{
    username: string;
    email: string;
    senha: string;
};

export interface IEmailUsuario{
    email: string;
};

export interface IIdUsuario{
    id: string;
};

export interface IAutenticarUsuario{
    email:string;
    senha: string;
}

export interface IAtualizarUsuario{
    id:string;
    username:string;
    email:string;
    
}

export interface IEmailnomeUsuario{
    username:string;
    email:string;
}

const prisma = new PrismaClient();

export class UsuariosDao{

    async autenticarUsuario({email,senha}:IAutenticarUsuario){

        const usuario = await this.buscarUsuario({email});

        const verificarSenha = await compare(senha,usuario.senha);

        if(!verificarSenha){
            throw new Error("Senha está incorreta.");
        };

        const token = sign(
            {email},
            process.env.CHAVE_JWT!,
            {
                expiresIn:'1d',
                algorithm:'HS256',
                subject:usuario.id
            }
        );

        return token;
    }

    async buscarUsuarios() {
        
        const usuarios = await prisma.usuarios.findMany();

        if(usuarios.length === 0) {
            return 'Não há usuários cadastrados no sistema.'
        }

        return usuarios;

    }

    async buscarUsuarioPorId({id}:IIdUsuario) {

        const usuario = await prisma.usuarios.findFirst({
            where:{
                id
            }
        });

        if(!usuario) {
            throw new Error('Usuário não encontrado.');
        };
      
        return usuario;
    };

    async buscarUsuario({email}:IEmailUsuario) {
        
        const usuario = await prisma.usuarios.findFirst({
            where:{
                email
            }
        });

        if(!usuario) {
            throw new Error('Usuário não cadastrado.');
        };
      
        return usuario;
    };

    async usuarioExiste({email}:IEmailUsuario) {

        const existsUsuario = await prisma.usuarios.findFirst({
            where:{
                email
            }
        });
    
        if(existsUsuario) {
            throw new Error("E-mail cadastrado");
        };
    };

    async cadastrarUsuario({
        username,
        email,
        senha,
    }:IUsuario){

        const senhaHash = await hash(senha,10);

        const usuario = await prisma.usuarios.create({
            data:{
                username,
                email,
                senha: senhaHash
            }
        });

        return usuario;
    };

    async deletarUsuario({email}:IEmailUsuario) {
        
        await prisma.usuarios.delete({
            where:{
                email
            }
        });
    };

    async atualizarUsuario({id,username,email}:IAtualizarUsuario){

        const novoUsuario = await prisma.usuarios.update({
            where:{
                id
            },
            data: {
                username, 
                email

            }, 
        })
        return novoUsuario;
    }

}