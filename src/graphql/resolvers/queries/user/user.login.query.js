import * as bcrypt from 'bcryptjs'
import { generateToken } from "../../../../middlewares/jwt.service"
import { UserModel } from "../../../../models/user.model"
export const userLoginQuery = {
    login: async (parent, args, ctx, info) => {
        console.log("args input", args.input)

        const user = await UserModel.findOne({ email: args.input.email });
        if (!user) {
            throw new Error('user not found')
        }
        const isValidPassword = await bcrypt.compare(args.input.password, user.password)
        if (!isValidPassword) {
            throw new Error('invalid password')
        }
        const token = generateToken(user)
        console.log("user", user)

        return {
            user,
            token
        }
    }
}
