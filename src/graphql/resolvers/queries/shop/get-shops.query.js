import { ShopModel } from "../../../../models/shop.model"

export const getShopsQuery = {
    getShops: async (parent, args, ctx, info) => {
        const page = args.page || 1
        const limit = args.limit || 20
        return await ShopModel.find({}).populate('owner').skip((page - 1) * limit).limit(limit)
    }
}
