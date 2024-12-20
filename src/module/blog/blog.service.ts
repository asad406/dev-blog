import IBlog from "./blog.interface"
import User from "./blog.model"

const createBlogIntoDB = async (payload: IBlog): Promise<IBlog> => {
    const result = await User.create(payload)
    return result
}
const getAllBlogFromDB = async () => {
    const result = await User.find().populate('author')
    return result
}
const getSingleBlogFromDB = async (id: string) => {
    const result = await User.findById(id)
    return result
}
const updateBlogToDB = async (id: string, data:Partial<IBlog>) => {
    const result = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    return result
}
const deleteBlogFromDB = async (id: string) => {
    const result = await User.findByIdAndDelete(id)
    return result
}

export const blogService = {
    createBlogIntoDB,
    getAllBlogFromDB,
    getSingleBlogFromDB,
    updateBlogToDB,
    deleteBlogFromDB
}