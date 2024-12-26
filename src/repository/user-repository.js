import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository{
    constructor(){
        super(User);
    }

    async findByUserAndLikeable(data){
        try {
            const like = await this.Like.findOne(data);
            return like;
        } catch (error) {
            throw error;
        }
    }
}

export default UserRepository;