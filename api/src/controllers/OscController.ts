import { Request, Response } from "express";
import { OscDao } from "../DAOs/OscDao";
import { verificarTokenBl } from "../services/verificarTokenBlackList.service";
import { IId } from "../types/types.id";
import { IAtualizarOSC, ICadastrarOsc } from "../types/types.osc";
import { splitToken } from "../utils/splitToken";

const oscDao = new OscDao();

export class OscController {

    async buscarTodasOSC(req:Request, res:Response) {
        
        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const osc = await oscDao.buscarOSC();

            return res.status(200)
                        .json( {osc} );
            
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async registrarOSC(req:Request, res:Response){

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const {nome, sigla, data_Fundacao, publico_Alvo, missao, visao} = <ICadastrarOsc>req.body;

            await oscDao.oscExiste({nome, sigla});

            const oscCadastrada = await oscDao.cadastrarOSC({nome, sigla, data_Fundacao, publico_Alvo, missao, visao});

            return res.status(201)
                        .json(oscCadastrada);

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        }
    };

    async buscarOSCById(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            const osc = await oscDao.buscarOSCPorId({id});

            return res.status(200)
                        .json( {osc} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async atualizarOSC(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const {id} = <IId><unknown>req.params;

            const {nome, sigla, data_Fundacao, publico_Alvo, missao, visao} = <IAtualizarOSC>req.body;

            const novaOSC = await oscDao.atualizarOSC({id,nome, sigla, data_Fundacao, publico_Alvo, missao, visao});

            return res.status(200)
                        .json( {OSC:novaOSC} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };           
    };

    async deletarOSC(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            await oscDao.deletarOSC({id});
        
            return res.status(200)
                        .json({ 
                            message: `OSC removida dos registros.`
                         });

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
    
}