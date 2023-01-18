import { IsISO8601, IsNotEmpty, IsString,IsOptional } from 'class-validator'

export class CadastrarOSCDTO {
    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    nome!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    sigla!: string

    @IsISO8601({ message: 'A data deve esta no formato ISO8601' })
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    data_Fundacao!: string

    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    publico_Alvo!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    missao!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    visao!: string
}

export class AtualizarOSCDTO {
    @IsString()
    @IsOptional()
    nome!: string

    @IsString()
    @IsOptional()
    sigla!: string

    @IsISO8601({ message: 'A data deve esta no formato ISO8601' })
    @IsOptional()
    data_Fundacao!: string

    @IsOptional()
    publico_Alvo!: string

    @IsString()
    @IsOptional()
    missao!: string

    @IsString()
    @IsOptional()
    visao!: string
}