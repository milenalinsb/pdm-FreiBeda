import { TokenBlackListDao } from './../DAOs/TokenBlackListDao';
import { IAutenticarUsuario, IEmailNomeUsuario, IEmailUsuario, IIdUsuario, IUsuario, UsuariosDao } from './../DAOs/UsuariosDao';
import { Request, Response } from "express";
import { splitToken } from '../utils/splitToken';
import { verificarTokenBl } from '../services/verificarTokenBlackList.service';

const usuariosDao = new UsuariosDao();
const tokenBl = new TokenBlackListDao();

export class UsuariosController {

    async login(req:Request, res:Response){
        
        try {

            const {email, senha} = <IAutenticarUsuario>req.body;

            const token = await usuariosDao.autenticarUsuario({email,senha});

            const usuario = await usuariosDao.buscarUsuario({email});

            return res.status(201)
                        .set('Authorization', token)
                        .json({
                            token: token,
                            id: usuario.id
                        });
            
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async logout(req:Request, res:Response){

        try {

            const header = req.headers.authorization;

            if(!header) {
                return res.status(403)
                            .json({
                                message:'Não há token.'
                            });
            };
        
            const token = splitToken(header);

            await tokenBl.inserirToken({token});

            return res.status(200)
                        .json({
                            message:'Logout realizado.'
                        });

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarTodosUsuarios(req:Request, res:Response) {
        
        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

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

            return res.status(201)
                        .json(usuarioCadastrado);

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async deletarUsuario(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
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

            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({token});
            
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

    async atualizarUsuario(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const {id} = <IIdUsuario><unknown>req.params;

            const {username,email} = <IEmailNomeUsuario>req.body;

            const novoUsuario = await usuariosDao.atualizarUsuario({id,username,email});

            return res.status(200)
                        .json( {usuario:novoUsuario} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };           
    };

}