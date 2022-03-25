import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"
import {UsersRepositories} from "../repositories/UsersRepositories";
 

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const userExistes = await usersRepositories.findOne({ 
            email,
        });

        if(!userExistes) {
            throw new Error("Email/Password incorrect");
        }

        const passwordMatch = await compare(password, userExistes.password)

        if(!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        const token = sign(
            { 
            email: userExistes.email, 
            }, 
            "af211c0849d8dc787335aebcd5197288", 
            { 
                subject: userExistes.id, 
                expiresIn: "1d"
            });

            return token;
    }
}

export {AuthenticateUserService}