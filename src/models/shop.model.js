const mongoose = require('mongoose')
import { SHOP_MODEL_NAME, USER_MODEL_NAME } from '../constants'


const shopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: USER_MODEL_NAME
    },
    shopImg: {
        type: String
    },
    place: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        }
    }


}, { timestamps: true })

export const ShopModel = mongoose.model(SHOP_MODEL_NAME, shopSchema)