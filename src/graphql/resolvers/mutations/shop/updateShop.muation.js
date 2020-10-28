import { imgUploadMiddleware } from "../../../../middlewares/handle-image.service"
import { transformLocation } from "../../../../middlewares/transform.place"
import { ShopModel } from "../../../../models/shop.model"

export const updateShopMutation = {
    updateShop: async (parent, args, ctx, info) => {
        const user = ctx[0]
        if (!user) {
            throw new Error("Login First")
        }
        console.log("user._id", user._id)
        const check = await ShopModel.findOne({ owner: user._id, _id: args.input.id })
        console.log("check", check)
        if (!check) {
            throw new Error("Shop Not Found Or You Are Not Allowed!")
        }
        let file
        if (args.input.shopImg) {
            file = await args.input.shopImg
        }
        let shopImg
        if (file) {
            shopImg = await imgUploadMiddleware(file)
        }

        let place
        if (args.input.place) {
            place = transformLocation(args.input.place.lng, args.input.place.lat)
        }
        let name
        if (args.input.name) {
            name = args.input.name;
        }
        const updateQuery = {
            name,
            place,
            shopImg
        }

        Object.keys(updateQuery).forEach((key) => (updateQuery[key] == undefined) && delete updateQuery[key]);

        await ShopModel.findOneAndUpdate({ owner: user._id, _id: args.input.id }, updateQuery, { new: true })
        const populatedShop = await ShopModel.findOne({ owner: user._id, _id: args.input.id }).populate("owner")
        return populatedShop
    }
}