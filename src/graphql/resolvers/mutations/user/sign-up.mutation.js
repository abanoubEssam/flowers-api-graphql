import { imgUploadMiddleware } from "../../../../middlewares/handle-image.service"
import { generateToken } from "../../../../middlewares/jwt.service"
import { UserModel } from "../../../../models/user.model"
import * as bcrypt from 'bcryptjs'
export const signUpMutation = {
    signUp: async (parent, { input }, ctx, info) => {

        const file = await input.profileImg
        const imgUploadPath = await imgUploadMiddleware(file)
        const hashedPassword = await bcrypt.hash(input.password, 12)

        const user = await UserModel.create({
            email: input.email,
            name: input.name,
            password: hashedPassword,
            profileImg: imgUploadPath
        })
        const token = generateToken(user)

        return {
            user,
            token
        }
    }
}
