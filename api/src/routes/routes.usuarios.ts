import { UsuariosController } from './../controllers/UsuariosController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';


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
                        usuariosController.registroUsuario);
routesUsuarios.delete('/usuarios/deletar',
                        verificarToken,
                        usuariosController.deletarUsuario);
 routesUsuarios.put('/usuarios/atualizar/:id',
                        verificarToken,
                        usuariosController.atualizarUsuario);

export { routesUsuarios }