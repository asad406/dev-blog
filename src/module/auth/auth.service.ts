import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import IUser from "../user/user.interface";
import User from "../user/user.model";

const register = async (payload: IUser) => {
    const result = await User.create(payload)
    return result
}

const login = async (payload: {email: string; password: string}) => {
    const user = await User.findOne({email: payload?.email})
    if(!user) {
        throw new AppError(StatusCodes.NOT_FOUND as number,'User is not found')
    }
}

export const authService = {
    register,
    login
}