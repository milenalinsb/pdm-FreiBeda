import { BeneficiariosController } from './../controllers/BeneficiariosController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';
import { makeValidateBody } from 'express-class-validator';
import { RegistrarBeneficiariosDTO } from '../validators/Beneficiario.dtos';

const routeBeneficiarios = Router();

const beneficiariosController = new BeneficiariosController();

routeBeneficiarios.get('/beneficiarios/buscarBeneficiarios',
                        verificarToken,
                        beneficiariosController.buscarTodosBeneficiarios);
routeBeneficiarios.get('/beneficiarios/buscarBeneficiarios/:id',
                        verificarToken,
                        beneficiariosController.buscarBeneficiarioById);
routeBeneficiarios.post('/beneficiarios/registrarBeneficiarios',
                        makeValidateBody(RegistrarBeneficiariosDTO),
                        verificarToken,
                        beneficiariosController.registrarBeneficiarios);
routeBeneficiarios.put('/beneficiarios/atualizarBeneficiarios/:id',
                        verificarToken,
                        beneficiariosController.atualizarBeneficiario);
routeBeneficiarios.delete('/beneficiarios/deletarBeneficiarios/:id',
                        verificarToken,
                        beneficiariosController.deletarBeneficiario);
routeBeneficiarios.put('/beneficiarios/upload/:id',
                        verificarToken,
                        beneficiariosController.uploadAvatarBeneficiario);

export { routeBeneficiarios };