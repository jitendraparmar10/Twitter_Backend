import mongoose from "mongoose";
const hashtagSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        unique: true,
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
}, {timestamps: true});

// hashtagSchema.pre('save', function (next){
//     this.title.toLowerCase();
//     next();
// }) 

const hashtag = mongoose.model('Hashtag', hashtagSchema);
export default hashtag;