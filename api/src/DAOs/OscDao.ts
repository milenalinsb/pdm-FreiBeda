import { PrismaClient } from '@prisma/client';
import { IId } from '../types/types.id';
import { IAtualizarOSC, ICadastrarOsc, IExisteOSC } from '../types/types.osc';

const prisma = new PrismaClient();

export class OscDao {
    
    async oscExiste({nome, sigla}:IExisteOSC) {
      
        const osc = await prisma.oSC.findFirst({
            where:{
                nome,
                sigla
            }
        });

        if(osc){
            throw new Error('Organização já está cadastrada no sistema.');
        }

        return osc;
    };

    async cadastrarOSC({
        nome,
        sigla,
        data_Fundacao,
        publico_Alvo,
        missao,
        visao
    }:ICadastrarOsc){

        const data = new Date(data_Fundacao);

        const osc = await prisma.oSC.create({
            data:{
                nome,
                sigla,
                data_Fundacao: data,
                publico_Alvo,
                missao,
                visao
            }
        });

        return osc;
    };

    async buscarOSC() {
        
        const osc = await prisma.oSC.findMany();

        if(osc.length === 0) {
            throw new Error("Não há organizações cadastradas no sistema.");
        };

        return osc;
    };

    async buscarOSCPorId({id}:IId){

        const osc = await prisma.oSC.findFirst({
            where:{
                id
            }
        });

        if(!osc){
            throw new Error("Organização não encontrada.");
        };        

        return osc;
    };

    async deletarOSC({id}:IId) {
        
       const osc = await prisma.oSC.delete({
            where:{
                id
            }
        });

        return osc;
    };

    async atualizarOSC({
        id,
        dados
    }:IAtualizarOSC){

        if (typeof dados.data_Fundacao != 'undefined') {
            dados.data_Fundacao = new Date(dados.data_Fundacao as Date);
        }

        const dataAtualizacao = Date.now();

        const novaOSC = await prisma.oSC.update({
            where:{
                id
            },
            data: {
                ...dados,
                modified_At: new Date(dataAtualizacao)
            }, 
        });

        return novaOSC;
    };
   
}