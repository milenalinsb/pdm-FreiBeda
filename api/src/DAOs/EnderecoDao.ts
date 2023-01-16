import { PrismaClient } from '@prisma/client';
import { IAtualizarEndereco, IEndereco, IEnderecoExiste } from '../types/types.endereco';
import { IId } from '../types/types.id';

const prisma = new PrismaClient();

export class EnderecoDao {

    async enderecoExiste({ logradouro, cep }:IEnderecoExiste) {
             
            const endereco = await prisma.enderecos.findFirst({
                where:{
                    logradouro,
                    cep
                }
            });
    
            if(endereco){
                throw new Error('Endereço já está cadastrado no sistema.');
            }
    
            return endereco;
    };

    async cadastrarEndereco({
        logradouro,
        numero,
        cep,
        bairro,
        cidade,
        estado,
        referencia
    }:IEndereco){

        const endereco = await prisma.enderecos.create({
            data:{
                logradouro,
                numero,
                cep,
                bairro,
                cidade,
                estado,
                referencia
            }
        });

        return endereco;
    };


    async buscarEndereco() {
        
        const endereco = await prisma.enderecos.findMany();

        if(endereco.length === 0) {
            throw new Error("Não há endereços cadastrados no sistema.");
        };

        return endereco;
    };

    async buscarEnderecoPorId({id}:IId){

        const endereco = await prisma.enderecos.findFirst({
            where:{
                id
            }
        });

        if(!endereco){
            throw new Error("Endereço não encontrado.");
        };
        
        return endereco;
    };

    async deletarEndereco({id}:IId) {
        
        const endereco = await prisma.enderecos.delete({
             where:{
                 id
             }
         });
         return endereco;
     };
 
     async atualizarEndereco({
        id,
        logradouro,
        numero,
        cep,
        bairro,
        cidade,
        estado,
        referencia
     }:IAtualizarEndereco){
  
         const dataAtualizacao = Date.now();
 
         const novoEndereco = await prisma.enderecos.update({
             where:{
                 id
             },
             data: {
                logradouro,
                numero,
                cep,
                bairro,
                cidade,
                estado,
                referencia,
                modified_At: new Date(dataAtualizacao)
             }, 
         });
         return novoEndereco;
     };
    
}