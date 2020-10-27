import { imgUploadMiddleware } from "../../../../middlewares/handle-image.service"
import { generateToken } from "../../../../middlewares/jwt.service"
import { UserModel } from "../../../../models/user.model"
import * as bcrypt from 'bcryptjs'
export const signUpMutation = {
    signUp: async (parent, args, ctx, info) => {
        // console.log("ctx", ctx)
        console.log("args", args)
        const checkUserExists = await UserModel.findOne({ email: args.input.email })
        if (checkUserExists) {
            throw new Error("Email Already Exists")
        }
        const file = await args.input.profileImg
        console.log("signUp => file", file)
        let profileImg
        if (file) {
            profileImg = await imgUploadMiddleware(file)
        }
        const hashedPassword = await bcrypt.hash(args.input.password, 12)

        const user = await UserModel.create({
            email: args.input.email,
            name: args.input.name,
            password: hashedPassword,
            profileImg
        })
        const token = generateToken(user)
        return {
            user,
            token
        }


    }
}
