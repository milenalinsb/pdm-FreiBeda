import { Request, Response } from 'express';
import { verificarTokenBl } from '../services/verificarTokenBlackList.service';
import { IId } from '../types/types.id';
import { IAtualizarProjetos, IProjetos } from '../types/types.projetos';
import { splitToken } from '../utils/splitToken';
import { ProjetosDao } from './../DAOs/ProjetosDao';


const projetosDao = new ProjetosDao();

export class ProjetosController {

    async registrarProjeto(req:Request, res:Response){

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const { id_fk_osc, id_fk_resumo_Projeto } = <IProjetos>req.body;

            const projeto = await projetosDao.cadastrarProjeto({ id_fk_osc, id_fk_resumo_Projeto });

            return res.status(201)
                        .json(projeto);

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarTodosProjetos(req:Request, res:Response) {
        
        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const projetos = await projetosDao.buscarProjetos();

            return res.status(200)
                        .json( {projetos} );
            
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarProjetoById(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            const projeto = await projetosDao.buscarProjetosPorId({id});

            return res.status(200)
                        .json( {projeto} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async atualizarProjeto(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const {id} = <IId><unknown>req.params;

            const { id_fk_osc, id_fk_resumo_Projeto } = <IAtualizarProjetos>req.body;

            const novoProjeto = await projetosDao.atualizarProjetos({ id, id_fk_osc, id_fk_resumo_Projeto });

            return res.status(200)
                        .json( {Projeto:novoProjeto} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };           
    };

    async deletarProjeto(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            await projetosDao.deletarProjeto({id});
        
            return res.status(200)
                        .json({ 
                            message: `Projeto removido dos registros.`
                         });

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };


};