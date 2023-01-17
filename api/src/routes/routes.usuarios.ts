import { Router } from 'express';
import { makeValidateBody } from 'express-class-validator';
import { verificarToken } from '../middlewares/verificarTokenJWT';
import { CadastrarUsuarioDTO } from "../validators/Usuarios.dtos";
import { UsuariosController } from './../controllers/UsuariosController';

const routesUsuarios = Router();

const usuariosController = new UsuariosController();

routesUsuarios.post('/login',
                        usuariosController.login);
routesUsuarios.get('/logout',
                        verificarToken,
                        usuariosController.logout);
routesUsuarios.get('/usuarios',
                    verificarToken,
                    usuariosController.buscarTodosUsuarios);
routesUsuarios.get('/usuarios/buscar/:id',
                        verificarToken,
                        usuariosController.buscarUsuarioById);
routesUsuarios.post('/usuarios/cadastrar',
                        makeValidateBody(CadastrarUsuarioDTO),
                        usuariosController.registrarUsuario);
routesUsuarios.delete('/usuarios/deletar',
                        verificarToken,
                        usuariosController.deletarUsuario);
 routesUsuarios.put('/usuarios/atualizar/:id',
                        verificarToken,
                        usuariosController.atualizarUsuario);

export { routesUsuarios };
