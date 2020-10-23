import { UserModel } from "../../../../models/user.model";
export const getUsersQuery = {
    getUsers: async (parent, args, ctx, info) => {
        console.log("ctx", ctx);
        return await UserModel.find({})
    }
}
