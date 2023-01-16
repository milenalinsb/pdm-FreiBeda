import { EnderecoController } from './../controllers/EnderecoController';
import { Router } from 'express';
import { verificarToken } from '../middlewares/verificarTokenJWT';

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
                        enderecoController.registroEndereco);
routesEndereco.put('/endereco/atualizarEndereco/:id',
                        verificarToken,
                        enderecoController.atualizarEndereco);
routesEndereco.delete('/endereco/deletarEndereco/:id',
                        verificarToken,
                        enderecoController.deletarEndereco);

export { routesEndereco };