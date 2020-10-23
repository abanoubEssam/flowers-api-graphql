import * as bcrypt from 'bcryptjs'
import { generateToken } from "../../../../middlewares/jwt.service"
import { UserModel } from "../../../../models/user.model"
export const userLoginQuery = {
    login: async (parent, { input }, ctx, info) => {

        const user = await UserModel.findOne({ email: input.email });
        if (!user) {
            throw new Error('user not found')
        }
        const isValidPassword = await bcrypt.compare(input.password, user.password)
        if (!isValidPassword) {
            throw new Error('invalid password')
        }
        const token = generateToken(user)

        return {
            user,
            token
        }
    }
}
