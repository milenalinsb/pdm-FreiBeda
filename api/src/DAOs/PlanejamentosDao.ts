import { PrismaClient } from '@prisma/client';
import { IId } from '../types/types.id';
import { IAtualizarPlanejamento, IPlanejamento, IPlanejamentoExiste } from '../types/types.planejamento';


const prisma = new PrismaClient();

export class PlanejamentosDao {
    
    async planejamentoExiste({ atividade }:IPlanejamentoExiste) {
             
        const planejamento = await prisma.planejamentos.findFirst({
            where:{
                atividade
            }
        });

        if(planejamento){
            throw new Error('Planejamento já está cadastrado no sistema.');
        }

        return planejamento;
};

async cadastrarPlanejamento({
    atividade,
    recursos,
    custo,
    responsavel,
    status,
    id_fk_projeto,
}:IPlanejamento){

    const planejamento = await prisma.planejamentos.create({
        data:{
            atividade,
            recursos,
            custo,
            responsavel,
            status,
            id_fk_projeto,
        }
    });

    return planejamento;
};


async buscarPlanejamentos() {
    
    const planejamentos = await prisma.planejamentos.findMany();

    if(planejamentos.length === 0) {
        throw new Error("Não há planejamentos cadastrados no sistema.");
    };

    return planejamentos;
};

async buscarPlanejamentosPorId({id}:IId){

    const planejamento = await prisma.planejamentos.findFirst({
        where:{
            id
        }
    });

    if(!planejamento){
        throw new Error("Planejamento não encontrado.");
    };
    
    return planejamento;
};

async deletarPlanejamento({id}:IId) {
    
    const planejamento = await prisma.planejamentos.delete({
         where:{
             id
         }
     });

     return planejamento;
 };

 async atualizarResumoProjetos({
    id,
    atividade,
    recursos,
    custo,
    responsavel,
    status,
    id_fk_projeto
 }:IAtualizarPlanejamento){

    const dataAtualizacao = Date.now();

     const novoPlanejamento = await prisma.planejamentos .update({
         where:{
             id
         },
         data: {
            atividade,
            recursos,
            custo,
            responsavel,
            status,
            id_fk_projeto,
            modified_At: new Date(dataAtualizacao)
         }, 
     });
     return novoPlanejamento;
 };

};