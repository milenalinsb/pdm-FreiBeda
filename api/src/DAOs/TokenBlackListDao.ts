import { PrismaClient } from '@prisma/client';

export interface IToken{
    token: string
}

const prisma = new PrismaClient();

export class TokenBlackListDao {

    async inserirToken( {token}:IToken ){
        
        await prisma.tokenBlacklist.create({
            data:{
                token
            }
        });
    }

    async buscarTokenBl( {token}:IToken ) {
        
        const tokenBl = await prisma.tokenBlacklist.findFirst({
            where:{
                token
            }
        });

        if(tokenBl){
            return true;
        };

        return false;
    };

}