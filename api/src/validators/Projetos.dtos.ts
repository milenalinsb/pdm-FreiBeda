import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ProjetosDTOS {
    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    nome: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    impacto: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    objetivo: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    atividades: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    responsavel: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    valor: string

    @IsOptional()
    @IsString()
    patrocinadores: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    oscID: string
}

export class AtualizarProjetosDTOS {
    @IsString()
    @IsOptional()
    nome: string

    @IsString()
    @IsOptional()
    impacto: string

    @IsString()
    @IsOptional()
    objetivo: string

    @IsString()
    @IsOptional()
    atividades: string

    @IsString()
    @IsOptional()
    responsavel: string

    @IsString()
    @IsOptional()
    valor: string

    @IsOptional()
    @IsString()
    patrocinadores: string
}
