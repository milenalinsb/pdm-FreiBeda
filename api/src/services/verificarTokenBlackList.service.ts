import { IToken, TokenBlackListDao } from './../DAOs/TokenBlackListDao';

const tokenBl = new TokenBlackListDao();

export async function verificarTokenBl( {token}:IToken ) {

    const isValid =  await tokenBl.buscarTokenBl({token});

    if(isValid) {
        throw new Error('Realize login novamente. Token inválido.');
    };

}