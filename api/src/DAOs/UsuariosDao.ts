import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

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

const prisma = new PrismaClient();

export class UsuariosDao{

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

}