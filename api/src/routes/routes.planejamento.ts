import { PlanejamentoController } from './../controllers/PlanejamentoController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';

const routePlanejamento = Router();

const planejamentoController = new PlanejamentoController();

routePlanejamento.get('/planejamentos/buscarPlanejamentos',
                    verificarToken,
                    planejamentoController.buscarTodosPlanejamentos);
routePlanejamento.get('/planejamentos/buscarPlanejamentos/:id',
                    verificarToken,
                    planejamentoController.buscarPlanejamentoById);
routePlanejamento.post('/planejamentos/cadastrarPlanejamentos',
                    verificarToken,
                    planejamentoController.registrarPlanejamento);
routePlanejamento.put('/planejamentos/atualizarPlanejamentos/:id',
                    verificarToken,
                    planejamentoController.atualizarPlanejamento);
routePlanejamento.delete('/planejamentos/buscarPlanejamentos/:id',
                    verificarToken,
                    planejamentoController.deletarPlanejamento);

export { routePlanejamento };