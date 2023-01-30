import { PrismaClient } from '@prisma/client';
import { IAtualizarGovernanca, IGovernanca } from '../types/types.governanca';
import { IId } from '../types/types.id';
import { RegistrarGovernancaDTO } from '../validators/Governancas.dtos';

const prisma = new PrismaClient();

export class GovernancaDao {

    async governancaExiste({ nome, cargo,idOsc }:RegistrarGovernancaDTO) {
             
        const governanca = await prisma.governanca.findFirst({
            where:{
                nome,
                cargo,
                id_fk_osc:idOsc
            }
        });

        if(governanca){
            throw new Error('Governança já está cadastrada no sistema.');
        }

        return governanca;
};

async cadastrarGovernanca({ nome, cargo,idOsc }:RegistrarGovernancaDTO){

    const governanca = await prisma.governanca.create({
        data:{
            nome,
            cargo,
            osc:{
                connect:{
                    id:idOsc,
                }
            }
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