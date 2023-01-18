import { OscController } from './../controllers/OscController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';
import { makeValidateBody } from 'express-class-validator';
import { CadastrarOSCDTO,AtualizarOSCDTO } from "../validators/Osc.dtos";

const routesOsc = Router();

const oscController = new OscController();

routesOsc.get('/osc/buscarOrg',
                    verificarToken,
                    oscController.buscarTodasOSC);
routesOsc.get('/osc/buscarOrg/:id',
                    verificarToken,
                    oscController.buscarOSCById);
routesOsc.post('/osc/cadastrarOrg',
                    verificarToken,
                    makeValidateBody(CadastrarOSCDTO),
                    oscController.registrarOSC);
routesOsc.put('/osc/atualizarOrg/:id',
                    verificarToken,
                    makeValidateBody(AtualizarOSCDTO),
                    oscController.atualizarOSC);
routesOsc.delete('/osc/deletarOsc/:id',
                    verificarToken,
                    oscController.deletarOSC);


export { routesOsc };