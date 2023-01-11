import { splitToken } from '../utils/splitToken';
import { TokenBlackListDao } from './../DAOs/TokenBlackListDao';

const tokenBl = new TokenBlackListDao();

export async function verificarTokenBl( header:any ) {

    const token =  splitToken(header);

    const isValid =  await tokenBl.buscarTokenBl(token);

    if(isValid) {
        throw new Error('Realize login novamente. Token inválido.');
    };

}