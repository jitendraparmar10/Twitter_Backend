import { LikeRepository,TweetRepository } from "../repository/index.js";
import Tweet from '../models/tweet.js';
class LikeService{
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId, modelType , userId){ //    /api/v1/togale?id=modelid&type=Tweet
        console.log(modelId,modelType, userId);
        if(modelType == 'Tweet'){
            var likeable = await this.tweetRepository.find(modelId);
        }
        else if ( modelType =='Comment'){
            //ToDo
        }
        else{
            throw new error('Unknown model type')
        }
        const exists = await this.likeRepository.findByUserAndLikeable({
            user: userId,
            onModel : modelType,
            likeable: modelId,
        });
        console.log("exist", exists);
        if(exists){
            likeable.likes.pull(exists.id);
            await likeable.save();
            await exists.deleteOne(); //remove() don't work 
            // await exists.remove();    it is not working that why i used deleteOne()
            var isAdded = false;
        }
        else{
            const newLike = await this.likeRepository.create({
                user: userId,
                onModel: modelType,
                likeable: modelId,
            });
            likeable.likes.push(newLike);
            await likeable.save();

            var isAdded = true;
        }
        return isAdded;
    }
}

export default LikeService;
