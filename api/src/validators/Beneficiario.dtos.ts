import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import {IsDate } from 'brazilian-class-validator';

export class RegistrarBeneficiariosDTO {
    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    nome?:string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    data_Nascimento?:string

    @IsString()
    @IsDate({message:'Data de aniversário não valida'})
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    sexo?:string
    
    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    cor_Declarada?:string

    @IsBoolean()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    is_Menor?:boolean

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    responsavel_Menor?:string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    profissao?:string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    renda_Mensal?:string
    
    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    id_fk_projeto?:string
}