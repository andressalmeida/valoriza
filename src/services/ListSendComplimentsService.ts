import { getCustomRepository } from "typeorm";
import {ComplimentsRepositories} from "../repositories/ComplimentsRepositories"

class ListSendComplimentsService {
    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimentsRepositories.find({
            where: { 
                user_sender: user_id
            },
            relations: ["tag"]
        })
        return compliments;
    }
}

export {ListSendComplimentsService}