import { Request, Response } from "express";
import { userService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from 'http-status-codes';
import catchAsync from "../../utils/catchAsync";
import { blogService } from "../blog/blog.service";


const createUser = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await userService.createUserIntoDB(payload)
    sendResponse(res, { statusCode: StatusCodes.CREATED, message: "User create successfully", data: result })
})

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getUserFromDB()
    sendResponse(res, { statusCode: StatusCodes.OK, message: "Users retrieved successfully", data: result })
})

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await userService.getSingleUserFromDB(id)
    sendResponse(res, { statusCode: StatusCodes.OK, message: 'User retrieved successfully', data: result })
})

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const data = { isBlocked: true }
    await userService.updateUserToDB(id, data)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User blocked successfully" })
})

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params
    const data = { isPublished: false }
    await blogService.deleteBlogFromDB(id, data)
    sendResponse(res, { statusCode: StatusCodes.OK, message: "User blocked successfully" })
})

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}