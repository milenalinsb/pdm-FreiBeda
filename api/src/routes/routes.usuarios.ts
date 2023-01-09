import { UsuariosController } from './../controllers/UsuariosController';
import { Router } from 'express';
import { routes } from '.';


const routesUsuarios = Router();

const usuariosController = new UsuariosController();

routesUsuarios.get('/usuarios',
                        usuariosController.buscarTodosUsuarios)
routesUsuarios.get('/usuarios/buscar/:id',
                        usuariosController.buscarUsuarioById);
routesUsuarios.post('/usuarios/cadastrar',
                        usuariosController.registroUsuario);
routesUsuarios.delete('/usuarios/deletar', 
                        usuariosController.deletarUsuario);

export { routesUsuarios }