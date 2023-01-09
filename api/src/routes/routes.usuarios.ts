import { UsuariosController } from './../controllers/UsuariosController';
import { Router } from 'express';


const routesUsuarios = Router()

const usuariosController = new UsuariosController()

routesUsuarios.post('/usuarios/cadastrar',
                    usuariosController.registroUsuario)

export { routesUsuarios }