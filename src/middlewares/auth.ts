import { NextFunction, Request, Response } from "express"
import catchAsync from "../utils/catchAsync"
import AppError from "../errors/AppError"
import { StatusCodes } from "http-status-codes"
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from "../config"
import User from "../module/user/user.model"

const auth = (requiredRoles: string) => {
    return catchAsync(async(req:Request, res: Response, next: NextFunction)=>{
        const token = req.headers.authorization

        if(!token){
            throw new AppError(StatusCodes.UNAUTHORIZED, "You are not authorized")
        }
        const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload

        const {email, role} = decoded
        const user = await User.findOne({email})

        if(!user){
            throw new AppError(StatusCodes.UNAUTHORIZED, "User not found")
        }

        if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(StatusCodes.UNAUTHORIZED,"You are not authorized")
        }
        req.user = decoded as JwtPayload

        next()

    })
}

export default auth