import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    IsOptional
} from 'class-validator'

import { Match } from '../decorators/match.decorator'

export class CadastrarUsuarioDTO {
    @IsString()
    @IsNotEmpty({ message: 'Você precisa informar o seu nome usuário' })
    username!: string

    @IsString()
    @IsNotEmpty({ message: 'Você precisa informar o seu email' })
    @IsEmail({}, { message: 'Este não é um e-mail valido' })
    email!: string

    @IsNotEmpty({ message: 'Você precisa informar a sua senha' })
    @MinLength(8, {
        message: 'Uma senha forte deve conter no mínimo 8 caracteres',
    })
    @MaxLength(20, {
        message: 'Uma senha forte deve conter no máximo 20 caracteres',
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'Senha muito fraca, use letras maiúsculas e minúsculas, números e símbolos como ! " ? $ % ^ &).',
    })
    senha!: string

    @IsString()
    @IsNotEmpty({ message: 'Esse campo e obrigatório' })
    @Match('senha', {
        message: 'As senhas não correspondem',
    })
    confirmarSenha!: string
}

export class LoginUsuarioDto {
    @IsNotEmpty({ message: "Você precisa informar o seu email" })
    @IsString()
    @IsEmail()
    email?: string;

    @IsNotEmpty({ message: "Você precisa informar a sua senha" })
    @IsString()
    senha?: string;
}

export class AtualizarUsuarioDto {
    @IsString()
    @IsOptional()
    username!: string

    @IsString()
    @IsOptional()
    @IsEmail({}, { message: 'Este não é um e-mail valido' })
    email!: string

    @IsOptional()
    @MinLength(8, {
        message: 'Uma senha forte deve conter no mínimo 8 caracteres',
    })
    @MaxLength(20, {
        message: 'Uma senha forte deve conter no máximo 20 caracteres',
    })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:
            'Senha muito fraca, use letras maiúsculas e minúsculas, números e símbolos como ! " ? $ % ^ &).',
    })
    senha!: string

}