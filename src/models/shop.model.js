const mongoose = require('mongoose')
import { SHOP_MODEL_NAME, USER_MODEL_NAME } from '../constants'
import { LocationSchema } from './location.model'


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
        type: LocationSchema,
        default: undefined
    }


}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id
            ret.owner.id = ret.owner._id
            // if (ret.place) {
            //     console.log("PLACE######");
            //     ret.place = {
            //             longitude: doc.place.coordinates[0],
            //             latitude: doc.place.coordinates[1]
            //     }
            // }
            ret.place = (ret.place) ? {
                longitude: doc.place.coordinates[0],
                latitude: doc.place.coordinates[1]
            } : undefined;
        }
    }
})


export const ShopModel = mongoose.model(SHOP_MODEL_NAME, shopSchema)