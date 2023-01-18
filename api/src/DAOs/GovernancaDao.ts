import { PrismaClient } from '@prisma/client';
import { IAtualizarGovernanca, IGovernanca } from '../types/types.governanca';
import { IId } from '../types/types.id';

const prisma = new PrismaClient();

export class GovernancaDao {

    async governancaExiste({ nome, cargo }:IGovernanca) {
             
        const governanca = await prisma.governanca.findFirst({
            where:{
                nome,
                cargo
            }
        });

        if(governanca){
            throw new Error('Governança já está cadastrada no sistema.');
        }

        return governanca;
};

async cadastrarGovernanca({ nome, cargo }:IGovernanca){

    const governanca = await prisma.governanca.create({
        data:{
            nome,
            cargo
        }
    });

    return governanca;
};


async buscarGovernanca() {
    
    const governanca = await prisma.governanca.findMany();

    if(governanca.length === 0) {
        throw new Error("Não há governanças cadastradas no sistema.");
    };

    return governanca;
};

async buscarGovernancaPorId({id}:IId){

    const governanca = await prisma.governanca.findFirst({
        where:{
            id
        }
    });

    if(!governanca){
        throw new Error("Governança não encontrada.");
    };        

    return governanca;
};

async deletarGovernanca({id}:IId) {
    
    const governanca = await prisma.governanca.delete({
         where:{
             id
         }
     });

     return governanca;
 };

 async atualizarGovernanca({ id, dados }:IAtualizarGovernanca){

     const dataAtualizacao = Date.now();

     const novaGovernanca = await prisma.governanca.update({
         where:{
             id
         },
         data: {
            ...dados,
            modified_At: new Date(dataAtualizacao)
         }, 
     });

     return novaGovernanca;
 };

}