import { Request, Response } from 'express';
import { verificarTokenBl } from '../services/verificarTokenBlackList.service';
import { IAtualizarBeneficiario, IBeneficiario } from '../types/types.beneficiario';
import { IId } from '../types/types.id';
import { splitToken } from '../utils/splitToken';
import { BeneficiariosDao } from './../DAOs/BeneficiariosDao';


const beneficiariosDao = new BeneficiariosDao();

export class BeneficiariosController {
    
    async registroBeneficiarios(req:Request, res:Response){

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const { nome, data_Nascimento, sexo, cor_Declarada, is_Menor, responsavel_Menor, profissao, renda_Mensal, id_fk_projeto } = <IBeneficiario>req.body;

            await beneficiariosDao.beneficiarioExiste({ nome });

            const beneficiarioCadastrado = await beneficiariosDao.cadastrarBeneficiario({ nome, data_Nascimento, sexo, cor_Declarada, is_Menor, responsavel_Menor, profissao, renda_Mensal, id_fk_projeto });

            return res.status(201)
                        .json(beneficiarioCadastrado);

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarTodosBeneficiarios(req:Request, res:Response) {
        
        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const beneficiarios = await beneficiariosDao.buscarBeneficiarios();

            return res.status(200)
                        .json( {beneficiarios} );
            
        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async buscarBeneficiarioById(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            const beneficiario = await beneficiariosDao.buscarBeneficiarioPorId({id});

            return res.status(200)
                        .json( {beneficiario} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };

    async atualizarBeneficiario(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});

            const {id} = <IId><unknown>req.params;

            const { nome, data_Nascimento, sexo, cor_Declarada, is_Menor, responsavel_Menor, profissao, renda_Mensal, id_fk_projeto } = <IAtualizarBeneficiario>req.body;

            const novoBeneficiario = await beneficiariosDao.atualizarBeneficiario({ id, nome, data_Nascimento, sexo, cor_Declarada, is_Menor, responsavel_Menor, profissao, renda_Mensal, id_fk_projeto });

            return res.status(200)
                        .json( {Beneficiário:novoBeneficiario} );

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };           
    };

    async deletarBeneficiario(req:Request, res:Response) {

        try {

            const token = splitToken(req.headers.authorization);

            await verificarTokenBl({token});
            
            const {id} = <IId><unknown>req.params;

            await beneficiariosDao.deletarBeneficiario({id});
        
            return res.status(200)
                        .json({ 
                            message: `Beneficiário removido dos registros.`
                         });

        } catch (error:any) {
            return res.status(400).json({
                message: error.message
            });
        };
    };
};