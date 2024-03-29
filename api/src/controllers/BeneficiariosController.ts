import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
import moment from 'moment'
import { verificarTokenBl } from '../services/verificarTokenBlackList.service'
import {
    IAtualizarBeneficiario,
    IBeneficiario,
} from '../types/types.beneficiario'
import { IId } from '../types/types.id'
import { BeneficiariosDao } from './../DAOs/BeneficiariosDao'

const beneficiariosDao = new BeneficiariosDao()

const prisma = new PrismaClient()

export class BeneficiariosController {
    async registrarBeneficiarios(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const {
                nome,
                data_Nascimento,
                sexo,
                cor_Declarada,
                is_Menor,
                responsavel_Menor,
                profissao,
                renda_Mensal,
                id_fk_projeto,
            } = <IBeneficiario>req.body

            await beneficiariosDao.beneficiarioExiste({ nome })

            const isMenor = Boolean(is_Menor)

            const projeto = await prisma.projetos.findFirst({
                where:{
                    id:id_fk_projeto
                },
                include:{
                    enderecos:true
                }
            })


            const data = await prisma.beneficiarios.create({
                data: {
                    nome,
                    data_Nascimento: moment(
                        data_Nascimento,
                        'YYYY-MM-DD'
                    ).toDate(),
                    sexo,
                    cor_Declarada,
                    is_Menor: isMenor,
                    responsavel_Menor,
                    profissao,
                    renda_Mensal,
                    Projetos: {
                        connect: {
                            id: id_fk_projeto,
                        },
                    },
                    endereco:{
                        connect:{
                            id: projeto?.enderecos.id
                        }
                    }
                },
            })

            console.log(data)

            return res.status(201).json({ message: 'Beneficiário criada' })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarTodosBeneficiarios(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const beneficiarios = await beneficiariosDao.buscarBeneficiarios()

            return res.status(200).json({ beneficiarios })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarBeneficiarioById(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const beneficiario = await beneficiariosDao.buscarBeneficiarioPorId(
                { id }
            )

            return res.status(200).json({ beneficiario })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async atualizarBeneficiario(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const {
                nome,
                data_Nascimento,
                sexo,
                cor_Declarada,
                is_Menor,
                responsavel_Menor,
                profissao,
                renda_Mensal,
                id_fk_projeto,
            } = <IAtualizarBeneficiario>req.body

            const novoBeneficiario =
                await beneficiariosDao.atualizarBeneficiario({
                    id,
                    nome,
                    data_Nascimento,
                    sexo,
                    cor_Declarada,
                    is_Menor,
                    responsavel_Menor,
                    profissao,
                    renda_Mensal,
                    id_fk_projeto,
                })

            return res.status(200).json({ Beneficiário: novoBeneficiario })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async deletarBeneficiario(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            await beneficiariosDao.deletarBeneficiario({ id })

            return res.status(200).json({
                message: `Beneficiário removido dos registros.`,
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async uploadAvatarBeneficiario(req: Request, res: Response) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.')
        }
        const avatar = <UploadedFile>req.files.avatar
        const { id } = <IId>(<unknown>req.params)
        avatar.name = id
        await beneficiariosDao.uploadBeneficiario(avatar, id)
        return res.status(200).json({
            message: 'Avatar atualizado',
        })
    }
}
