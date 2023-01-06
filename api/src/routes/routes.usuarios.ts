import { UsuariosController } from './../controllers/UsuariosController';
import { Router } from 'express';

const usuariosController = new UsuariosController()

const routesUsuarios = Router()

routesUsuarios.post("usuarios/cadastrar",usuariosController.cadastrarUsuario)

export { routesUsuarios }