import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true,
    },
    onModel: {
        type:String,
        require: true,
        enum: ['Tweet' , 'Comment']
    },
    commentable: {
        type : mongoose.Schema.Types.ObjectId,
        require: true,
        refPath:'onModel'
    }
},{timestamps:true});

const Comment = mongoose.model('Comment', commentSchema);
export default Comment; 