import { GovernancaController } from './../controllers/GovernancaController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';
import { makeValidateBody } from 'express-class-validator';
import { RegistrarGovernancaDTO } from "../validators/Governancas.dtos";

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
                    makeValidateBody(RegistrarGovernancaDTO),
                    governancaController.registrarGovernanca);
routesGovernanca.put('/governanca/atualizarGovernanca/:id',
                    verificarToken,
                    governancaController.atualizarGovernanca);
routesGovernanca.delete('/governanca/deletarGovernanca/:id',
                    verificarToken,
                    governancaController.deletarGovernanca);

export { routesGovernanca };