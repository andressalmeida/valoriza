import { getCustomRepository } from "typeorm";
import {ComplimentsRepositories} from "../repositories/ComplimentsRepositories"

class ListReceiveComplimentsService {
    async execute(user_id: string) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

        const compliments = await complimentsRepositories.find({
            where: { 
                user_receiver: user_id
            },
            relations: ["tag"]
        })
        return compliments;
    }
}

export {ListReceiveComplimentsService}