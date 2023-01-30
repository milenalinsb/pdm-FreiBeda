import { IsCEP } from "brazilian-class-validator";
import {  IsNotEmpty, IsString,IsNumberString } from "class-validator";

export class CadastrarOSCDTO {
  @IsString()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  nome!: string;

  @IsString()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  sigla!: string;


  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  publico_Alvo!: string;

  @IsString()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  missao!: string;

  @IsString()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  visao!: string;

  @IsString()
  @IsNotEmpty({ message: 'Esse campo e obrigatório' })
  logradouro!: string

  @IsString()
  @IsNumberString({},{message:'Esse número não e valido'})
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
