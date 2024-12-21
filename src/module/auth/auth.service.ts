import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import IUser from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from "../../config";

const register = async (payload: IUser) => {
    const result = await User.create(payload)
    return result
}

const login = async (payload: { email: string; password: string }) => {
    const user = await User.findOne({email: payload?.email})
    if(!user) {
        throw new AppError(StatusCodes.UNAUTHORIZED as number,'User is not found')
    }
    const isBlocked = user?.isBlocked
    if (isBlocked === true){
        throw new AppError(StatusCodes.UNAUTHORIZED, "User is blocked")
    }
    const isPasswordMatch = await bcrypt.compare(payload?.password, user?.password)
    if(!isPasswordMatch){
        throw new AppError(StatusCodes.UNAUTHORIZED,"Incorrect password")
    }
  
    const token = jwt.sign({email: user?.email, role: user?.role, userId:user?._id}, config.jwt_secret as string, {expiresIn: '30d'})
   
    return {token, user}
}

export const authService = {
    register,
    login
}