import QueryBuilder from "../../builder/QueryBuilder"

import IBlog from "./blog.interface"
import Blog from "./blog.model"
import User from "./blog.model"

const createBlogIntoDB = async (payload: IBlog): Promise<IBlog> => {   
  
    const result = (await User.create(payload)).populate('author')
    return result
}
const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogSearchableFields = ['title', 'content']
    const blogQuery = new QueryBuilder(Blog.find().populate('author'), query).search(blogSearchableFields).filter().sort()
    // const result = await User.find().populate('author')
    const result = await blogQuery.modelQuery
    return result
}
const updateBlogToDB = async (id: string, data: Partial<IBlog>) => {
    const result = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('author')
    return result
}
const deleteBlogFromDB = async (id: string, data: Partial<IBlog>) => {
    const result = await User.findByIdAndUpdate(id, data)
    return result
}

export const blogService = {
    createBlogIntoDB,
    getAllBlogsFromDB,    
    updateBlogToDB,
    deleteBlogFromDB
}