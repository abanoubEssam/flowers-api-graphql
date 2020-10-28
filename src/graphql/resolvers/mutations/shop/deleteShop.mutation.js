import { ShopModel } from "../../../../models/shop.model"

export const deleteShopMutation = {
    deleteShop: async (parent, args, ctx, info) => {
        const user = ctx[0]
        if (!user) {
            throw new Error("Login First")
        }
        console.log("user._id", user._id)
        const check = await ShopModel.findOne({ owner: user._id, _id: args.id })
        console.log("check", check)
        if (!check) {
            throw new Error("Shop Not Found Or You Are Not Allowed!")
        }

        try {
            
            await ShopModel.deleteOne({ owner: user._id, _id: args.id })
            return true

        } catch (error) {
            return error
        }

    }
}