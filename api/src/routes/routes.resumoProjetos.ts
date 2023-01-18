import { ResumoProjetosController } from './../controllers/ResumoProjetoController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';

const routeResumoProjetos = Router();

const resumoProjetosController = new ResumoProjetosController();

routeResumoProjetos.get('/resumos/buscarResumo',
                    verificarToken,
                    resumoProjetosController.buscarTodosResumos);
routeResumoProjetos.get('/resumos/buscarResumo/:id',
                    verificarToken,
                    resumoProjetosController.buscarResumoById);
routeResumoProjetos.post('/resumos/cadastrarResumo',
                    verificarToken,
                    resumoProjetosController.registrarResumo);
routeResumoProjetos.put('/resumos/atualizarResumo/:id',
                    verificarToken,
                    resumoProjetosController.atualizarResumo);
routeResumoProjetos.delete('/resumos/deletarResumo/:id',
                    verificarToken,
                    resumoProjetosController.deletarResumo);

export { routeResumoProjetos };