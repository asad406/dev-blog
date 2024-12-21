import QueryBuilder from "../../builder/QueryBuilder"
import IBlog from "./blog.interface"
import Blog from "./blog.model"
import User from "./blog.model"

const createBlogIntoDB = async (payload: IBlog): Promise<IBlog> => {
    const result = await User.create(payload)
    return result
}
const getAllBlogFromDB = async (query: Record<string, unknown>) => {
    const blogSearchableFields = ['title', 'content']
    const blogQuery = new QueryBuilder(Blog.find().populate('author'), query).search(blogSearchableFields).filter().sort()
    // const result = await User.find().populate('author')
    const result = await blogQuery.modelQuery
    return result
}
const getSingleBlogFromDB = async (id: string) => {
    const result = await User.findById(id)
    return result
}
const updateBlogToDB = async (id: string, data: Partial<IBlog>) => {
    const result = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    return result
}
const deleteBlogFromDB = async (id: string, data: Partial<IBlog>) => {
    const result = await User.findByIdAndUpdate(id, data)
    return result
}

export const blogService = {
    createBlogIntoDB,
    getAllBlogFromDB,
    getSingleBlogFromDB,
    updateBlogToDB,
    deleteBlogFromDB
}