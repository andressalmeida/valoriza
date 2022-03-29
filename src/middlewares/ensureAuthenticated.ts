import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction) {
        
    const authtoken = request.headers.authorization;

    if(!authtoken) {
        return response.status(401).end();
    }

    const [,token] = authtoken.split(" ")

    try {
        const {sub} = verify(
            token , 
            "af211c0849d8dc787335aebcd5197288"
        ) as IPayload;
         
        request.user_id = sub;

        return next();

    } catch (error) {
        return response.status(401).end();
    }
   
    }