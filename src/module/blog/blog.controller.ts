import { Request, Response } from "express";
import { blogService } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from 'http-status-codes';
import catchAsync from "../../utils/catchAsync";


const createBlog = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await blogService.createBlogIntoDB(payload)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "Blog create successfully", data: result })
})

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const result = await blogService.getAllBlogsFromDB(req.query)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Blogs retrieved successfully", data: result })
})
const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const data = req.body
    const result = await blogService.updateBlogToDB(id, data)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Blog update successfully", data: result })
})

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    await blogService.deleteBlogFromDB(id, { isPublished: false })
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Blog delete successfully" })
})

export const blogController = {
    createBlog,
    getAllBlogs,   
    updateBlog,
    deleteBlog
}