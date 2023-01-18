import { Request, Response } from 'express';
import { verificarTokenBl } from '../services/verificarTokenBlackList.service';
import { IAtualizarGovernanca, IAtualizarGovernancaData, IGovernanca } from '../types/types.governanca';
import { IId } from '../types/types.id';
import { GovernancaDao } from './../DAOs/GovernancaDao';

const governancaDao = new GovernancaDao();

export class GovernancaController {

    async registrarGovernanca(req:Request, res:Response){

        try {

            const token = <string>req.headers.authorization;

            await verificarTokenBl({token});
            
            const { nome, cargo } = <IGovernanca>req.body;

            await governancaDao.governancaExiste({ nome, cargo });

            const governancaCadastradad = await governancaDao.cadastrarGovernanca({ nome, cargo });

            return res.status(201)
                        .json({message: `Governança cadastrada.`});

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarTodasGovernancas(req:Request, res:Response) {
        
        try {

            const token =  <string>req.headers.authorization;

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

            const token =  <string>req.headers.authorization

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

            const token =  <string>req.headers.authorization;

            await verificarTokenBl({token});

            const {id} = <IId><unknown>req.params;

            const dados = <IAtualizarGovernancaData>req.body;

            const novaGovernanca = await governancaDao.atualizarGovernanca({ id, dados });

            return res.status(200)
                        .json( { 
                            message: `Governança atualizada.`
                         } );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };           
    };

    async deletarGovernanca(req:Request, res:Response) {

        try {

            const token =  <string>req.headers.authorization;

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