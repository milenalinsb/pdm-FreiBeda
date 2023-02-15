import { hash } from 'bcrypt'
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import { verificarTokenBl } from '../services/verificarTokenBlackList.service'
import { IId } from '../types/types.id'
import {
    IAutenticarUsuario,
    IEmailNomeUsuario,
    IEmailUsuario,
    IUsuario,
} from '../types/types.usuarios'
import { TokenBlackListDao } from './../DAOs/TokenBlackListDao'
import { UsuariosDao } from './../DAOs/UsuariosDao'

const usuariosDao = new UsuariosDao()
const tokenBl = new TokenBlackListDao()

export class UsuariosController {
    async login(req: Request, res: Response) {
        try {
            const { email, senha } = <IAutenticarUsuario>req.body

            const token = await usuariosDao.autenticarUsuario({ email, senha })

            const usuario = await usuariosDao.buscarUsuario({ email })

            return res.status(201).set('Authorization', token).json({
                token: token,
                id: usuario.id,
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async uploadAvatarUsuario(req: Request, res: Response) {
        if (!req.files || Object.keys(req.files).length === 0) {
            console.log(12345);
            return res.status(400).send('No files were uploaded.');
          }
        const avatar =<UploadedFile> req.files.avatar;
        const { id } = <IId>(<unknown>req.params);
        avatar.name = id;
        await usuariosDao.uploadUsuario(avatar,id)
        return res.status(200).json({
            message: 'Avatar atualizado',
        })
    }

    async logout(req: Request, res: Response) {
        try {
            const header = req.headers.authorization

            if (!header) {
                return res.status(403).json({
                    message: 'Não há token.',
                })
            }

            const token = header

            await tokenBl.inserirToken({ token })

            return res.status(200).json({
                message: 'Logout realizado.',
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarTodosUsuarios(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const usuarios = await usuariosDao.buscarUsuarios()

            return res.status(200).json({ usuarios })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async registrarUsuario(req: Request, res: Response) {
        try {
            const { username, email, senha } = <IUsuario>req.body

            await usuariosDao.usuarioExiste({ email })

            const usuarioCadastrado = await usuariosDao.cadastrarUsuario({
                username,
                email,
                senha,
            })

            return res.status(201).json({ message: 'Usuário criado' })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async deletarUsuario(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { email } = <IEmailUsuario>req.body

            const { id } = await usuariosDao.buscarUsuario({ email })

            await usuariosDao.deletarUsuario({ id })

            return res.status(200).json({
                message: `Usuário com id:${id} deletado.`,
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarUsuarioById(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const usuario = await usuariosDao.buscarUsuarioPorId({ id })

            return res.status(200).json({ usuario })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async atualizarUsuario(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const dados = <IEmailNomeUsuario>req.body

            if (typeof dados.senha != 'undefined') {
                dados.senha = await hash(dados.senha, 10)
            }

            const novoUsuario = await usuariosDao.atualizarUsuario({
                id,
                dados,
            })

            return res.status(200).json({ message: "Usuário atualizado" })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        } 
    }
}
