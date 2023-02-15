import { ProjetosController } from './../controllers/ProjetosController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';
import { makeValidateBody } from 'express-class-validator';
import { ProjetosDTOS,AtualizarProjetosDTOS } from "../validators/Projetos.dtos";

const routeProjetos = Router();

const projetosController = new ProjetosController();

routeProjetos.get('/projetos/buscarProjetos',
                    verificarToken,
                    projetosController.buscarTodosProjetos);
routeProjetos.get('/projetos/buscarProjetos/:id',
                    verificarToken,
                    projetosController.buscarProjetoById);
routeProjetos.post('/projetos/registrarProjetos',
                    makeValidateBody(ProjetosDTOS),
                    verificarToken,
                    projetosController.registrarProjeto);
routeProjetos.put('/projetos/atualizarProjetos/:id',
                    verificarToken,
                    makeValidateBody(AtualizarProjetosDTOS),
                    projetosController.atualizarProjeto);
routeProjetos.delete('/projetos/deletarProjetos/:id',
                    verificarToken,
                    projetosController.deletarProjeto);

                    routeProjetos.get('/projetos/osc/:id',
                    verificarToken,
                    projetosController.buscarTodosProjetosOSC);

export { routeProjetos };