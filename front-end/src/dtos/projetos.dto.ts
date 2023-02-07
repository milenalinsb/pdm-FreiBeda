import {  IsNotEmpty, IsString } from "class-validator";

export class ProjetosDTO {
    @IsString()
    @IsNotEmpty({ message: "Esse campo e obrigatório" })
    nome!: string

    @IsString()
    @IsNotEmpty({ message: "Esse campo e obrigatório" })
    impacto!: string

    @IsString()
    @IsNotEmpty({ message: "Esse campo e obrigatório" })
    atividades!: string

    @IsString()
    @IsNotEmpty({ message: "Esse campo e obrigatório" })
    objetivo!: string

    @IsString()
    @IsNotEmpty({ message: "Esse campo e obrigatório" })
    oscID!: string


    @IsString()
    @IsNotEmpty({ message: "Esse campo e obrigatório" })
    patrocinadores!: string

    @IsString()
    @IsNotEmpty({ message: "Esse campo e obrigatório" })
    responsavel!: string

    @IsString()
    @IsNotEmpty({ message: "Esse campo e obrigatório" })
    valor!: string

}