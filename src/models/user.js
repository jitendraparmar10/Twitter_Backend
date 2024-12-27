import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
});

userSchema.methods.comparePassword = function compare(password){
    return bcrypt.compareSync(password, this.password)
}

userSchema.methods.genJWT = function generate(){
    return jwt.sign({id: this._id , email: this.email}, 'twitter_secret', {
        expiresIn : '1h'
    });
}

const User = new mongoose.model('User' , userSchema);

export default User;