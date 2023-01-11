import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { splitToken } from "../utils/splitToken";


export function verificarToken(req: Request, res:Response, next:NextFunction) {
    
    const header = req.headers.authorization;

    if(!header) {
        return res.status(403)
                    .json({
                        message:'Não há token.'
                    });
    };

    const token = splitToken(header);

    try {
        
        verify(token, process.env.CHAVE_JWT!);

        return next();

    } catch (error:any) {
        return res.status(403)
                    .json({
                        message:'Token não é válido.'
                    });
    };
    
}