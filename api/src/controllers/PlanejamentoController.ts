import { Request, Response } from 'express'
import { verificarTokenBl } from '../services/verificarTokenBlackList.service'
import { IId } from '../types/types.id'
import {
    IAtualizarPlanejamento,
    IPlanejamento,
} from '../types/types.planejamento'
import { splitToken } from '../utils/splitToken'
import { PlanejamentosDao } from './../DAOs/PlanejamentosDao'

const planejamentosDao = new PlanejamentosDao()

export class PlanejamentoController {
    async registrarPlanejamento(req: Request, res: Response) {
        try {
            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({ token })

            const {
                atividade,
                recursos,
                custo,
                responsavel,
                status,
                id_fk_projeto,
            } = <IPlanejamento>req.body

            await planejamentosDao.planejamentoExiste({ atividade })

            const planejamento = await planejamentosDao.cadastrarPlanejamento({
                atividade,
                recursos,
                custo,
                responsavel,
                status,
                id_fk_projeto, 
            })

            return res.status(201).json(planejamento)
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarTodosPlanejamentos(req: Request, res: Response) {
        try {
            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({ token })

            const planejamentos = await planejamentosDao.buscarPlanejamentos()

            return res.status(200).json({ planejamentos })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarPlanejamentoById(req: Request, res: Response) {
        try {
            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const planejamento =
                await planejamentosDao.buscarPlanejamentosPorId({ id })

            return res.status(200).json({ planejamento })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async atualizarPlanejamento(req: Request, res: Response) {
        try {
            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const {
                atividade,
                recursos,
                custo,
                responsavel,
                status,
                id_fk_projeto,
            } = <IAtualizarPlanejamento>req.body

            const novoPlanejamento =
                await planejamentosDao.atualizarResumoProjetos({
                    id,
                    atividade,
                    recursos,
                    custo,
                    responsavel,
                    status,
                    id_fk_projeto,
                })

            return res.status(200).json({ Planejamento: novoPlanejamento })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async deletarPlanejamento(req: Request, res: Response) {
        try {
            const token = splitToken(req.headers.authorization)

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            await planejamentosDao.deletarPlanejamento({ id })

            return res.status(200).json({
                message: `Planejamento removido dos registros.`,
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }
}
