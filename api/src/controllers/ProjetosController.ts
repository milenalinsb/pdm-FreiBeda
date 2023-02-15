import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { verificarTokenBl } from '../services/verificarTokenBlackList.service'
import { IId } from '../types/types.id'
import {
    AtualizarProjetosDTOS,
    ProjetosDTOS,
} from '../validators/Projetos.dtos'

const prisma = new PrismaClient()

export class ProjetosController {
    async registrarProjeto(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const {
                atividades,
                impacto,
                nome,
                objetivo,
                oscID,
                patrocinadores,
                responsavel,
                valor,
            } = <ProjetosDTOS>req.body

            const enderecos = await prisma.enderecos.findFirst({
                where:{
                    id_fk_osc:oscID
                }
            })

            if (enderecos != null) {
                const data = await prisma.projetos.create({
                    data: {
                        atividades,
                        impacto,
                        nome,
                        objetivo,
                        patrocinadores,
                        valor,
                        responsavel,
                        oSCId: oscID,
                        enderecosId:enderecos.id
                    },
                })
            }
            return res.status(201).json({ message: 'Projeto criado' })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarTodosProjetos(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const data = await prisma.projetos.findMany()

            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarTodosProjetosOSC(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const data = await prisma.projetos.findMany({
                where:{
                    oSCId:id
                }
            })

            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarProjetoById(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const data = await prisma.projetos.findMany({
                where: {
                    id,
                },
            })

            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async atualizarProjeto(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const atualizarBody = <AtualizarProjetosDTOS>req.body

            const data = await prisma.projetos.update({
                data: {
                    ...atualizarBody,
                },
                where: {
                    id: id,
                },
            })

            return res.status(200).json({ message: 'Projeto atualizado' })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async deletarProjeto(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            await prisma.projetos.delete({
                where: {
                    id,
                },
            })

            return res.status(200).json({
                message: `Projeto removido dos registros.`,
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }
}
