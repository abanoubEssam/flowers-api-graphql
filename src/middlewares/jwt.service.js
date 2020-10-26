import { JWT_EXPIRES_IN, JWT_SECRET_KEY } from "../constants"
import * as jwt from 'jsonwebtoken'
import { UserModel } from "../models/user.model"

export const generateToken = (user) => {
    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN })
    return token
}


export const validateToken = async (authorizationToken) => {
        const token = authorizationToken.split(' ')[1]
        const decodedToken = jwt.verify(token, JWT_SECRET_KEY);
        if (!decodedToken) {
            throw new Error("UnAuthorized => Decoded")
        }
        const user = await UserModel.find({ _id: decodedToken.userId })
        if (!user) {
            throw new Error("UnAuthorized => user")
        }
        return user
}