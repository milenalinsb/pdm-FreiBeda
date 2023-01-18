import { PrismaClient } from '@prisma/client';
import { IAtualizarBeneficiario, IBeneficiario, IBeneficiarioExiste } from '../types/types.beneficiario';
import { IId } from '../types/types.id';


const prisma = new PrismaClient();

export class BeneficiariosDao {

    async beneficiarioExiste({ nome }:IBeneficiarioExiste) {
             
        const beneficiario = await prisma.beneficiarios.findFirst({
            where:{
                nome
            }
        });

        if(beneficiario){
            throw new Error('Beneficiário já está cadastrado no sistema.');
        }

        return beneficiario;
};

async cadastrarBeneficiario({
    nome,
    data_Nascimento,
    sexo,
    cor_Declarada,
    is_Menor,
    responsavel_Menor,
    profissao,
    renda_Mensal,
    id_fk_projeto
}:IBeneficiario){

    const dataNascimento = new Date(data_Nascimento);
    const isMenor = Boolean(is_Menor);

    const beneficiario = await prisma.beneficiarios.create({
        data:{
            nome,
            data_Nascimento: dataNascimento,
            sexo,
            cor_Declarada,
            is_Menor: isMenor,
            responsavel_Menor,
            profissao,
            renda_Mensal,
            id_fk_projeto
        }
    });

    return beneficiario;
};


async buscarBeneficiarios() {
    
    const beneficiarios = await prisma.beneficiarios.findMany();

    if(beneficiarios.length === 0) {
        throw new Error("Não há beneficiários cadastrados no sistema.");
    };

    return beneficiarios;
};

async buscarBeneficiarioPorId({id}:IId){

    const beneficiario = await prisma.beneficiarios.findFirst({
        where:{
            id
        }
    });

    if(!beneficiario){
        throw new Error("Benenficiário não encontrado.");
    };
    
    return beneficiario;
};

async deletarBeneficiario({id}:IId) {
    
    const beneficiario = await prisma.beneficiarios.delete({
         where:{
             id
         }
     });

     return beneficiario;
 };

 async atualizarBeneficiario({
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
 }:IAtualizarBeneficiario){

    const dataAtualizacao = Date.now();
    const dataNascimento = new Date(data_Nascimento);
    const isMenor = Boolean(is_Menor);


     const novoBeneficiario = await prisma.beneficiarios .update({
         where:{
             id
         },
         data: {
            nome,
            data_Nascimento: dataNascimento,
            sexo,
            cor_Declarada,
            is_Menor: isMenor,
            responsavel_Menor,
            profissao,
            renda_Mensal,
            id_fk_projeto,
            modified_At: new Date(dataAtualizacao)
         }, 
     });
     return novoBeneficiario;
 };
    
};