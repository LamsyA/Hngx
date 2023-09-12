import mongoose ,{ Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email?: string;
    age: number;
}

const UserSchema:Schema<IUser> = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
        unique: true,
    }

})

const User =  mongoose.model<IUser>("User", UserSchema)

export default User;