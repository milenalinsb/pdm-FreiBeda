import { IUsuario, UsuariosDao } from './../DAOs/UsuariosDao';
import { Request, Response } from "express";

const usuariosDao = new UsuariosDao();

export class UsuariosController {


    async cadastrarUsuario(req:Request, res:Response){

        try {
            
            const {username, email, senha} = <IUsuario>req.body

            await usuariosDao.usuarioExiste({username,email,senha})

            const usuarioCadastrado = await usuariosDao.cadastrarUsuario({username,email,senha})

            return res.status(200)
                        .json(usuarioCadastrado)

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            })
        }

    }

}