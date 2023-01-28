import { IsNotEmpty, IsString ,IsOptional } from 'class-validator';

export class RegistrarGovernancaDTO {
    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    nome!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    cargo!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    idOsc!: string
}

export class AtualizarGovernancaDTO {
    @IsString()
    @IsOptional()
    nome!: string

    @IsString()
    @IsOptional()
    cargo!: string
}