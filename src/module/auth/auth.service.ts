import IUser from "../user/user.interface";
import User from "../user/user.model";

const registerToDB = async (payload: IUser) => {
    const result = await User.create(payload)
    return result
}

export const authService = {
    registerToDB
}