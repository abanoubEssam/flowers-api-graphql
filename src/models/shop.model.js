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


}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            ret.place = {
                longitude: doc.place.coordinates[0],
                latitude: doc.place.coordinates[1],
            }
            console.log("ret.place", ret.place)
            console.log("ret", ret)
        }
    }
})

// shopSchema.set('toJSON', {
//     transform: function (doc, ret, options) {
//         console.log("doc.place", doc.place.coordinates[0])
//         console.log("doc.place", doc.place.coordinates[1])
//         console.log("TO JSON ############");
//         ret.place = {
//             longitude: doc.place.coordinates[1],
//             latitude: doc.place.coordinates[0],
//         };
//         console.log("ret.place", ret.place)
//     },
// });

export const ShopModel = mongoose.model(SHOP_MODEL_NAME, shopSchema)