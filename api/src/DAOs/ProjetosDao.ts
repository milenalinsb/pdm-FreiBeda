import { PrismaClient } from '@prisma/client';
import { IId } from '../types/types.id';
import { IAtualizarProjetos, IProjetos } from '../types/types.projetos';

const prisma = new PrismaClient();

export class ProjetosDao {
    
    async cadastrarProjeto({
        id_fk_osc,
        id_fk_resumo_Projeto,
    }:IProjetos){
    
        const projeto = await prisma.projetos.create({
            data:{
                id_fk_osc,
                id_fk_resumo_Projeto
            }
        });
    
        return projeto;
    };
    
    
    async buscarProjetos() {
        
        const projetos = await prisma.projetos.findMany();
    
        if(projetos.length === 0) {
            throw new Error("Não há projetos cadastrados no sistema.");
        };
    
        return projetos;
    };
    
    async buscarProjetosPorId({id}:IId){
    
        const projeto = await prisma.projetos.findFirst({
            where:{
                id
            }
        });
    
        if(!projeto){
            throw new Error("Projeto não encontrado.");
        };
        
        return projeto;
    };
    
    async deletarProjeto({id}:IId) {
        
        const projeto = await prisma.projetos.delete({
             where:{
                 id
             }
         });
    
         return projeto;
     };
    
     async atualizarProjetos({
        id,
        id_fk_osc,
        id_fk_resumo_Projeto
     }:IAtualizarProjetos){
    
        const dataAtualizacao = Date.now();
    
         const novoProjeto = await prisma.projetos.update({
             where:{
                 id
             },
             data: {
                id_fk_osc,
                id_fk_resumo_Projeto,
                modified_At: new Date(dataAtualizacao)
             }, 
         });
         return novoProjeto;
     };
};