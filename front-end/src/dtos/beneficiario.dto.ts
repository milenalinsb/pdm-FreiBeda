import { IsDate } from "brazilian-class-validator";
import { IsNotEmpty, IsString,IsBooleanString } from "class-validator";

export class BeneficiarioDTO {
  @IsString()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  nome?: string;

  @IsDate()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  data_Nascimento!: Date;

  @IsString()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  sexo!: string;

  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  is_Menor!: boolean;

  @IsString()
  responsavel_Menor?: string;

  @IsString()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  profissao?: string;

  @IsString()
  @IsNotEmpty({ message: "Esse campo e obrigatório" })
  renda_Mensal?: string;

  avatar?: string;
  @IsString()
  id_fk_projeto!: string;
}
