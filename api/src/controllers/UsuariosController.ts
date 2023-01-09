import { IEmailUsuario, IIdUsuario, IUsuario, UsuariosDao } from './../DAOs/UsuariosDao';
import { Request, Response } from "express";

const usuariosDao = new UsuariosDao();

export class UsuariosController {

    async buscarTodosUsuarios(req:Request, res:Response) {
        
        try {

            const usuarios = await usuariosDao.buscarUsuarios();

            return res.status(200)
                        .json( {usuarios} );
            
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };


    async registroUsuario(req:Request, res:Response){

        try {
            
            const {username, email, senha} = <IUsuario>req.body;

            await usuariosDao.usuarioExiste({email});

            const usuarioCadastrado = await usuariosDao.cadastrarUsuario({username,email,senha});

            return res.status(200)
                        .json(usuarioCadastrado);

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async deletarUsuario(req:Request, res:Response) {

        try {
            
            const {email} = <IEmailUsuario>req.body;

            const usuario = await usuariosDao.buscarUsuario({email});

            await usuariosDao.deletarUsuario({email});
        
            return res.status(200)
                        .json({ 
                            message: `Usuário com id:${usuario.id} deletado.`
                         });

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarUsuarioById(req:Request, res:Response) {

        try {
            
            const {id} = <IIdUsuario><unknown>req.params;

            const usuario = await usuariosDao.buscarUsuarioPorId({id});

            return res.status(200)
                        .json( {usuario} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    
    };

}