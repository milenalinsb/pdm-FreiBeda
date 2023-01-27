import { Request, Response } from 'express'
import NodeGeocoder from 'node-geocoder'
import { verificarTokenBl } from '../services/verificarTokenBlackList.service'
import { IAtualizarEnderecoData, IEndereco } from '../types/types.endereco'
import { IId } from '../types/types.id'
import { EnderecoDao } from './../DAOs/EnderecoDao'
import { ILocalization } from '../types/types.localization'

const enderecoDao = new EnderecoDao()

export class EnderecoController {
    async registrarEndereco(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const {
                logradouro,
                numero,
                cep,
                bairro,
                cidade,
                estado,
                referencia,
            } = <IEndereco>req.body

            await enderecoDao.enderecoExiste({ logradouro, cep })

            const enderecoCadastrado = await enderecoDao.cadastrarEndereco({
                logradouro,
                numero,
                cep,
                bairro,
                cidade,
                estado,
                referencia,
            })

            return res.status(201).json({ id: enderecoCadastrado.id })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarTodosEnderecos(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const enderecos = await enderecoDao.buscarEndereco()

            return res.status(200).json({ enderecos })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async buscarEnderecoById(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const endereco = await enderecoDao.buscarEnderecoPorId({ id })

            const geocoder = NodeGeocoder({
                provider: 'openstreetmap',
            })

            const localizationBuscar = await geocoder.geocode(
                `${endereco.cidade}, ${endereco.estado}, ${endereco.cep}, Brasil`
            )

            const localization =<ILocalization>localizationBuscar[0]

            return res.status(200).json({ endereco,...localization})
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async atualizarEndereco(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            const dados = <IAtualizarEnderecoData>req.body

            const novoEndereco = await enderecoDao.atualizarEndereco({
                id,
                dados,
            })

            return res.status(200).json({
                message: `Endereço atualizado.`,
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }

    async deletarEndereco(req: Request, res: Response) {
        try {
            const token = <string>req.headers.authorization

            await verificarTokenBl({ token })

            const { id } = <IId>(<unknown>req.params)

            await enderecoDao.deletarEndereco({ id })

            return res.status(200).json({
                message: `Endereço removido dos registros.`,
            })
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            })
        }
    }
}
