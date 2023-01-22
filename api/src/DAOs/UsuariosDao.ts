import { PrismaClient } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import { UploadedFile } from 'express-fileupload'
import { sign } from 'jsonwebtoken'
import { uploadFile } from '../services/uploadFile.service'
import { IId } from '../types/types.id'
import {
    IAtualizarUsuario,
    IAutenticarUsuario,
    IEmailUsuario,
    IUsuario,
} from '../types/types.usuarios'

const prisma = new PrismaClient()

export class UsuariosDao {
    async autenticarUsuario({ email, senha }: IAutenticarUsuario) {
        const usuario = await this.buscarUsuario({ email })

        const verificarSenha = await compare(senha, usuario.senha)

        if (!verificarSenha) {
            throw new Error('Senha está incorreta.')
        }

        const token = sign({ email }, process.env.CHAVE_JWT!, {
            expiresIn: '1d',
            algorithm: 'HS256',
            subject: usuario.id,
        })

        return token
    }

    async buscarUsuarios() {
        const usuarios = await prisma.usuarios.findMany()

        if (usuarios.length === 0) {
            return 'Não há usuários cadastrados no sistema.'
        }

        return usuarios
    }

    async buscarUsuarioPorId({ id }: IId) {
        const usuario = await prisma.usuarios.findFirst({
            where: {
                id,
            },
            select: {
                created_At: true,
                email: true,
                modified_At: true,
                id: true,
                username: true,
            },
        })

        if (!usuario) {
            throw new Error('Usuário não encontrado.')
        }

        return usuario
    }

    async buscarUsuario({ email }: IEmailUsuario) {
        const usuario = await prisma.usuarios.findFirst({
            where: {
                email,
            },
        })

        if (!usuario) {
            throw new Error('Usuário não cadastrado.')
        }

        return usuario
    }

    async usuarioExiste({ email }: IEmailUsuario) {
        const existsUsuario = await prisma.usuarios.findFirst({
            where: {
                email,
            },
        })

        if (existsUsuario) {
            throw new Error('E-mail cadastrado')
        }
    }

    async cadastrarUsuario({ username, email, senha }: IUsuario) {
        const senhaHash = await hash(senha, 10)

        const usuario = await prisma.usuarios.create({
            data: {
                username,
                email,
                senha: senhaHash,
            },
        })

        return usuario
    }

    async deletarUsuario({ id }: IId) {
        const usuario = await prisma.usuarios.delete({
            where: {
                id,
            },
        })

        return usuario
    }

    async atualizarUsuario({ id, dados }: IAtualizarUsuario) {
        const dataAtualizacao = Date.now()

        const novoUsuario = await prisma.usuarios.update({
            where: {
                id,
            },
            data: {
                ...dados,
                modified_At: new Date(dataAtualizacao),
            },
        })
        return novoUsuario
    }

    async uploadUsuario(avatar: UploadedFile,id:string) {
        uploadFile(avatar)
        const dataAtualizacao = Date.now()
        await prisma.usuarios.update({
            where: {
                id,
            },
            data: {
                modified_At: new Date(dataAtualizacao),
                avatar:`${avatar.name}.png`
            },
        })
    }
}
