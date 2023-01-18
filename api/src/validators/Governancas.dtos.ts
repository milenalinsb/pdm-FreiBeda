import { IsNotEmpty, IsString,IsNumberString,IsOptional } from 'class-validator';

export class RegistrarGovernancaDTO {
    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    nome!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    cargo!: string
}