import { Request, Response } from 'express'
import { verificarTokenBl } from '../services/verificarTokenBlackList.service'
import { IId } from '../types/types.id'
import {
    IAtualizarResumoProjeto,
    IResumoProjeto,
} from '../types/types.resumo_projetos'
import { ResumoProjetosDao } from './../DAOs/ResumoProjetosDao'

const resumoProjetosDao = new ResumoProjetosDao()

export class ResumoProjetosController {
    async registrarResumo(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const {
                nome,
                impacto,
                objetivo,
                atividades,
                responsavel,
                valor,
                patrocinadores,
            } = <IResumoProjeto>req.body

            await resumoProjetosDao.resumoProjetoExiste({ nome })

            const resumoProjeto =
                await resumoProjetosDao.cadastrarResumoProjeto({
                    nome,
                    impacto,
                    objetivo,
                    atividades,
                    responsavel,
                    valor,
                    patrocinadores,
                })

            return res.status(201).json(resumoProjeto)
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarTodosResumos(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const resumos = await resumoProjetosDao.buscarResumoProjetos()

            return res.status(200).json({ resumos })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarResumoById(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const resumo = await resumoProjetosDao.buscarResumoProjetosPorId({
                id,
            })

            return res.status(200).json({ resumo })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async atualizarResumo(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const {
                nome,
                impacto,
                objetivo,
                atividades,
                responsavel,
                valor,
                patrocinadores,
            } = <IAtualizarResumoProjeto>req.body

            const novoResumo = await resumoProjetosDao.atualizarResumoProjetos({
                id,
                nome,
                impacto,
                objetivo,
                atividades,
                responsavel,
                valor,
                patrocinadores,
            })

            return res.status(200).json({ Resumo: novoResumo })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async deletarResumo(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            await resumoProjetosDao.deletarResumoProjetos({ id })

            return res.status(200).json({
                message: `Resumo removido dos registros.`,
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }
}
