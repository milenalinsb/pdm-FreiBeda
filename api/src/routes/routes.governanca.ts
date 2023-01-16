import { GovernancaController } from './../controllers/GovernancaController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';

const routesGovernanca = Router();

const governancaController = new GovernancaController();

routesGovernanca.get('/governanca/buscarGovernanca',
                    verificarToken,
                    governancaController.buscarTodasGovernancas);
routesGovernanca.get('/governanca/buscarGovernanca/:id',
                    verificarToken,
                    governancaController.buscarGovernancaById);
routesGovernanca.post('/governanca/cadastrarGovernanca',
                    verificarToken,
                    governancaController.registrarGovernanca);
routesGovernanca.put('/governanca/atualizarGovernanca/:id',
                    verificarToken,
                    governancaController.atualizarGovernanca);
routesGovernanca.delete('/governanca/buscarGovernanca/:id',
                    verificarToken,
                    governancaController.deletarGovernanca);

export { routesGovernanca };