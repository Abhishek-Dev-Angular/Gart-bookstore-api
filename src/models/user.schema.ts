import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
    userName: String,
    password: String,
    userEmail: String,
    isAdmin: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

UserSchema.pre('save', async function (next: any) {
    try {
        if(!this.isModified('password')){
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this.password  = hashed;
        return next();
    } catch(err){
        return next(err);
    }
})