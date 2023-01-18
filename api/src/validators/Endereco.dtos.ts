import { IsNotEmpty, IsString,IsNumberString,IsOptional } from 'class-validator';
import { IsCEP, } from 'brazilian-class-validator';

export class CadastrarEnderecoDTO {
    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    logradouro!: string

    @IsString()
    @IsNumberString({message:'Esse número não e valido'})
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    numero!: string

    @IsString()
    @IsCEP({message:'Esse não é um cep valido'})
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    cep!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    bairro!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    cidade!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    estado!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    referencia!: string
}

export class AtualizarEnderecoDTO {
    @IsString()
    @IsOptional()
    logradouro!: string

    @IsString()
    @IsNumberString({message:'Esse número não e valido'})
    @IsOptional()
    numero!: string

    @IsString()
    @IsCEP({message:'Esse não é um cep valido'})
    @IsOptional()
    cep!: string

    @IsString()
    @IsOptional()
    bairro!: string

    @IsString()
    @IsOptional()
    cidade!: string

    @IsString()
    @IsOptional()
    estado!: string

    @IsString()
    @IsOptional()
    referencia!: string
}