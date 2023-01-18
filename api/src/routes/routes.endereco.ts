import { EnderecoController } from './../controllers/EnderecoController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';
import { makeValidateBody } from 'express-class-validator';
import { CadastrarEnderecoDTO,AtualizarEnderecoDTO } from "../validators/Endereco.dtos";

const routesEndereco = Router();

const enderecoController = new EnderecoController();

routesEndereco.get('/endereco/buscarEndereco',
                        verificarToken,
                        enderecoController.buscarTodosEnderecos);
routesEndereco.get('/endereco/buscarEndereco/:id',
                        verificarToken,
                        enderecoController.buscarEnderecoById);
routesEndereco.post('/endereco/cadastrarEndereco',
                        verificarToken,
                        makeValidateBody(CadastrarEnderecoDTO),
                        enderecoController.registrarEndereco);
routesEndereco.put('/endereco/atualizarEndereco/:id',
                        verificarToken,
                        makeValidateBody(AtualizarEnderecoDTO),
                        enderecoController.atualizarEndereco);
routesEndereco.delete('/endereco/deletarEndereco/:id',
                        verificarToken,
                        enderecoController.deletarEndereco);

export { routesEndereco };