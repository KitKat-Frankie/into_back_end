import e from "express";
import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 10
    },

    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 25,
        hidden: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
        
    }

},

{timestamps: true});

export const User = mongoose.model("User", UserSchema);

