import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true ,
        unique:true
    },
    password: {
        type:String,
        require: true
    },
    name: {
        type:String,
        require:true
    }
},{timestamps: true});

userSchema.pre('save' , function (next){
    const user = this;
    const SALT = bcrypt.genSaltSync(9);
    const encryptPassword = bcrypt.hashSync(user.password , SALT);
    user.password = encryptPassword;
    next();
})

const User = new mongoose.model('User' , userSchema);

export default User;