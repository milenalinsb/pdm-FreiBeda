import { TokenBlackListDao } from './../DAOs/TokenBlackListDao';

const tokenBl = new TokenBlackListDao();

export async function verificarTokenBl( token:any ) {

    const isValid =  await tokenBl.buscarTokenBl(token);

    if(isValid) {
        throw new Error('Realize login novamente. Token inválido.');
    };

}