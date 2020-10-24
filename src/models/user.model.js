const mongoose = require('mongoose')
import { USER_MODEL_NAME } from '../constants'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImg: {
        type: String
    }
}, { timestamps: true })

export const UserModel = mongoose.model(USER_MODEL_NAME, userSchema)