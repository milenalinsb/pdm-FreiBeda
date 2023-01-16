import { Request, Response } from 'express';
import { verificarTokenBl } from '../services/verificarTokenBlackList.service';
import { IAtualizarEndereco, IEndereco } from '../types/types.endereco';
import { IId } from '../types/types.id';
import { splitToken } from '../utils/splitToken';
import { EnderecoDao } from './../DAOs/EnderecoDao';

const enderecoDao = new EnderecoDao();

export class EnderecoController {
    
    async registrarEndereco(req:Request, res:Response){

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const {logradouro, numero, cep, bairro, cidade, estado, referencia} = <IEndereco>req.body;

            await enderecoDao.enderecoExiste({logradouro, cep});

            const enderecoCadastrado = await enderecoDao.cadastrarEndereco({logradouro, numero, cep, bairro, cidade, estado, referencia});

            return res.status(201)
                        .json(enderecoCadastrado);

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarTodosEnderecos(req:Request, res:Response) {
        
        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const enderecos = await enderecoDao.buscarEndereco();

            return res.status(200)
                        .json( {enderecos} );
            
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarEnderecoById(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            const endereco = await enderecoDao.buscarEnderecoPorId({id});

            return res.status(200)
                        .json( {endereco} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async atualizarEndereco(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const {id} = <IId><unknown>req.params;

            const { logradouro, numero, cep, bairro, cidade, estado, referencia} = <IAtualizarEndereco>req.body;

            const novoEndereco = await enderecoDao.atualizarEndereco({ id, logradouro, numero, cep, bairro, cidade, estado, referencia });

            return res.status(200)
                        .json( {Endereco:novoEndereco} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };           
    };

    async deletarEndereco(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            await enderecoDao.deletarEndereco({id});
        
            return res.status(200)
                        .json({ 
                            message: `Endereço removido dos registros.`
                         });

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
};