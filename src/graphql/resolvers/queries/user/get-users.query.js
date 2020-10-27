import { UserModel } from "../../../../models/user.model";
export const getUsersQuery = {
    getUsers: async (parent, args, ctx, info) => {
        const page = args.page || 1
        const limit = args.limit || 100
        return await UserModel.find({}).skip((page - 1) * limit).limit(limit)
    }
}
