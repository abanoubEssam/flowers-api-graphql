import { USER_MODEL_NAME } from "../../../../constants"
import { imgUploadMiddleware } from "../../../../middlewares/handle-image.service"
import { transformLocation } from "../../../../middlewares/transform.place"
import { ShopModel } from "../../../../models/shop.model"

export const createShopMutation = {
    createShop: async (parent, args, ctx, info) => {
        console.log("args", args)
        const user = ctx[0]
        console.log("user", user._id)
        if (!user) {
            throw new Error("Login First")
        }
        const file = await args.input.shopImg
        console.log("file", file)
        let shopImg
        
        if (file) {
            shopImg = await imgUploadMiddleware(file)
        }

        let place
        if (args.input.place) {
            place = transformLocation(args.input.place.lng, args.input.place.lat)    
        }

        const shop = await ShopModel.create({
            owner: user._id,
            name: args.input.name,
            place,
            shopImg
        })
        const populatedShop = await ShopModel.findById(shop._id).populate("owner")
        return populatedShop
    }
}