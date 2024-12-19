import IUser from "./user.interface"
import User from "./user.model"

const createUserIntoDB = async(payload : IUser): Promise<IUser> =>{
    const result = await User.create(payload)
    return result
}
const getUserFromDB = async() =>{
    const result = await User.find()
    return result
}
const getSingleUserFromDB = async(id:string) =>{
    const result = await User.findById(id)
    return result
}
const updateUserToDB = async(id:string, data: IUser) =>{
    const result = await User.findByIdAndUpdate(id,data)
    return result
}

export const userService = {
    createUserIntoDB,
    getUserFromDB,
    getSingleUserFromDB,
    updateUserToDB
}