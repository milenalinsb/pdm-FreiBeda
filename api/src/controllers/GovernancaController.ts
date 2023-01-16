import { Request, Response } from 'express';
import { verificarTokenBl } from '../services/verificarTokenBlackList.service';
import { IAtualizarGovernanca, IGovernanca } from '../types/types.governanca';
import { IId } from '../types/types.id';
import { splitToken } from '../utils/splitToken';
import { GovernancaDao } from './../DAOs/GovernancaDao';

const governancaDao = new GovernancaDao();

export class GovernancaController {

    async registroGovernanca(req:Request, res:Response){

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const { nome, cargo } = <IGovernanca>req.body;

            await governancaDao.governancaExiste({ nome, cargo });

            const governancaCadastradad = await governancaDao.cadastrarGovernanca({ nome, cargo });

            return res.status(201)
                        .json(governancaCadastradad);

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarTodasGovernancas(req:Request, res:Response) {
        
        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const governancas = await governancaDao.buscarGovernanca();

            return res.status(200)
                        .json( { governancas } );
            
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarGovernancaById(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            const governanca = await governancaDao.buscarGovernancaPorId({id});

            return res.status(200)
                        .json( {governanca} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async atualizarGovernanca(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const {id} = <IId><unknown>req.params;

            const { nome,cargo } = <IAtualizarGovernanca>req.body;

            const novaGovernanca = await governancaDao.atualizarGovernanca({ id, nome, cargo });

            return res.status(200)
                        .json( {Governanca:novaGovernanca} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };           
    };

    async deletarGovernanca(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            await governancaDao.deletarGovernanca({id});
        
            return res.status(200)
                        .json({ 
                            message: `Governança removida dos registros.`
                         });

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
};