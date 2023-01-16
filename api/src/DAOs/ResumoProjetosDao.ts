import { PrismaClient } from '@prisma/client';
import { IId } from '../types/types.id';
import { IAtualizarResumoProjeto, IResumoExiste, IResumoProjeto } from '../types/types.resumo_projetos';

const prisma = new PrismaClient();

export class ResumoProjetosDao {

    async resumoProjetoExiste({ nome }:IResumoExiste) {
             
        const resumoProjeto = await prisma.resumo_Projetos.findFirst({
            where:{
                nome
            }
        });

        if(resumoProjeto){
            throw new Error('Resumo já está cadastrado no sistema.');
        }

        return resumoProjeto;
};

async cadastrarResumoProjeto({
    nome,
    impacto,
    objetivo,
    atividades,
    responsavel,
    valor,
    patrocinadores
}:IResumoProjeto){

    const resumoProjetos = await prisma.resumo_Projetos.create({
        data:{
            nome,
            impacto,
            objetivo,
            atividades,
            responsavel,
            valor,
            patrocinadores
        }
    });

    return resumoProjetos;
};


async buscarResumoProjetos() {
    
    const resumoProjetos = await prisma.resumo_Projetos.findMany();

    if(resumoProjetos.length === 0) {
        throw new Error("Não há resumos cadastrados no sistema.");
    };

    return resumoProjetos;
};

async buscarResumoProjetosPorId({id}:IId){

    const resumoProjetos = await prisma.resumo_Projetos.findFirst({
        where:{
            id
        }
    });

    if(!resumoProjetos){
        throw new Error("Resumo não encontrado.");
    };
    
    return resumoProjetos;
};

async deletarResumoProjetos({id}:IId) {
    
    const resumoProjetos = await prisma.resumo_Projetos.delete({
         where:{
             id
         }
     });

     return resumoProjetos;
 };

 async atualizarResumoProjetos({
    id,
    impacto,
    objetivo,
    atividades,
    responsavel,
    valor,
    patrocinadores
 }:IAtualizarResumoProjeto){

    const dataAtualizacao = Date.now();

     const novoResumoProjeto = await prisma.resumo_Projetos .update({
         where:{
             id
         },
         data: {
            impacto,
            objetivo,
            atividades,
            responsavel,
            valor,
            patrocinadores,
            modified_At: new Date(dataAtualizacao)
         }, 
     });
     return novoResumoProjeto;
 };
 
};