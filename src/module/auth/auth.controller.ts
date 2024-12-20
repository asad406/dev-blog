import { Request, Response } from "express"
import catchAsync from "../../utils/catchAsync"
import sendResponse from "../../utils/sendResponse"
import { StatusCodes } from "http-status-codes"
import { authService } from "./auth.service"

const register = catchAsync(async (req: Request, res: Response) => {   
    const result = await authService.register(req.body)
    sendResponse(res, { statusCode: StatusCodes.OK, message: 'Register successfully', data: result })
})

export const authController = {
    register
}