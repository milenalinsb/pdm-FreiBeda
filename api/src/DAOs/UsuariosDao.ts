import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';


export interface IUsuario{
    username: string
    email: string
    senha: string
}

const prisma = new PrismaClient()

export class UsuariosDao{

    async usuarioExiste({email}:IUsuario) {

        const existsUsuario = await prisma.usuarios.findFirst({
            where:{
                email
            }
        })
    
        if(existsUsuario) {
            throw new Error("Usuario possui cadastro");
        }
    
    }    

    async cadastrarUsuario({
        username,
        email,
        senha,
    }:IUsuario){

        const senhaHash = await hash(senha,10)

        const usuario = await prisma.usuarios.create({
            data:{
                username,
                email,
                senha: senhaHash
            }
        })

        return usuario
    }

    
    async deletarUsuario({email}:IUsuario) {
        
        await prisma.usuarios.delete({
            where:{
                email
            }
        })
    }

}