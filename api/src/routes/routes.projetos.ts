import { ProjetosController } from './../controllers/ProjetosController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';

const routeProjetos = Router();

const projetosController = new ProjetosController();

routeProjetos.get('/projetos/buscarProjetos',
                    verificarToken,
                    projetosController.buscarTodosProjetos);
routeProjetos.get('/projetos/buscarProjetos/:id',
                    verificarToken,
                    projetosController.buscarProjetoById);
routeProjetos.post('/projetos/registrarProjetos',
                    verificarToken,
                    projetosController.registrarProjeto);
routeProjetos.put('/projetos/atualizarProjetos/:id',
                    verificarToken,
                    projetosController.atualizarProjeto);
routeProjetos.delete('/projetos/deletarProjetos/:id',
                    verificarToken,
                    projetosController.deletarProjeto);

export { routeProjetos };