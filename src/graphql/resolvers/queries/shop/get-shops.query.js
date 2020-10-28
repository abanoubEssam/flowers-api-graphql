import { ShopModel } from "../../../../models/shop.model"

export const getShopsQuery = {
    getShops: async (parent, args, ctx, info) => {

        const page = args.page || 1
        const limit = args.limit || 20
        let query = {}
        if (args.place) {
            const radius = args.place.radius || 10
            query["place.coordinates"] = {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [args.place.lng, args.place.lat]
                    },
                    $maxDistance: radius * 1000
                }
            }
        }
        if (args.name) {
            query["name"] = args.name
        }
        if (args.id) {
            query["_id"] = args.id
        }
        if (args.owner) {
            query["owner"] = args.owner
        }

        const shops = await ShopModel.find(query).populate('owner').skip((page - 1) * limit).limit(limit)
        const count = await ShopModel.find(query).count()
        console.log("shops => count", count)

        const shopStr = JSON.stringify(shops)
        const shopParsed = JSON.parse(shopStr)
        return shopParsed
    }
}
