import { ShopModel } from "../../../../models/shop.model"

export const getShopsQuery = {
    getShops: async (parent, args, ctx, info) => {
        const page = args.page || 1
        const limit = args.limit || 20
        let query = {}
        if (args.place) {
            query["place.coordinates"] = {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [args.place.lng, args.place.lat]
                    },
                    $maxDistance: 1000

                }
            }
        }
        const shops = await ShopModel.find(query).populate('owner').skip((page - 1) * limit).limit(limit)
        const shopStr = JSON.stringify(shops)
        const shopParsed = JSON.parse(shopStr)
        return shopParsed
    }
}