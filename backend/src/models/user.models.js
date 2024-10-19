import { Schema } from "mongoose";
import mongoose from "mongoose";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import shortid from "shortid";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: false,
        undefined: false
    },
    link: {
        type: String,
        required: true,
        default: shortid.generate,
        unique: true,
        undefined: false
    },
    Messages: {
        type: [],
        required: true,
        unique: false,
        undefined: false
    }
},{timestamps: true});

const User =  mongoose.model("User", userSchema);

export default User;
