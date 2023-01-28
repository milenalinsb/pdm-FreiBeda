import { Request, Response } from 'express';
import { verificarTokenBl } from '../services/verificarTokenBlackList.service';
import {  IAtualizarGovernancaData, IGovernanca } from '../types/types.governanca';
import { IId, IIdOsc } from '../types/types.id';
import { GovernancaDao } from './../DAOs/GovernancaDao';
import { RegistrarGovernancaDTO } from "../validators/Governancas.dtos";
import { PrismaClient } from '@prisma/client';

const governancaDao = new GovernancaDao();

const prisma = new PrismaClient();

export class GovernancaController {

    async registrarGovernanca(req:Request, res:Response){

        try {

            const token = <string>req.headers.authorization;

            await verificarTokenBl({token});
            
            const { nome, cargo,idOsc } = <RegistrarGovernancaDTO>req.body;

            await governancaDao.governancaExiste({ nome, cargo,idOsc });

            const governancaCadastradad = await governancaDao.cadastrarGovernanca({ nome, cargo,idOsc });

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


    async buscarGovernancaByIdOsc(req:Request, res:Response) {

        try {
            const token =  <string>req.headers.authorization

            await verificarTokenBl({token});
            
            const {idOsc} = <IIdOsc><unknown>req.params;

            const governanca = await prisma.governanca.findMany({
                where:{
                    id_fk_osc:idOsc
                }
            })

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