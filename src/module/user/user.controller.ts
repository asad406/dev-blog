import { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const payload = req.body
        const result = await userService.createUserIntoDB(payload)
        res.json({
            message: "User create successfully",
            data: result
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'Something went wrong',
            err
        })
     
    }
}
const getAllUsers = async (req: Request, res: Response) => {
    try {

        const result = await userService.getUserFromDB()
        res.send({
            message: "Users retrieved successfully",
            data: result
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'Something went wrong',
            err
        })
    }
}
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
     
        const result = await userService.getSingleUserFromDB(id)
        res.send({
            message: "User retrieved successfully",
            data: result
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'Something went wrong',
            err
        })
    }
}
const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const payload = req.body

        const result = await userService.updateUserToDB(id, payload)
        res.send({
            message: "User update successfully",
            data: result
        })
    } catch (err) {
        res.json({
            status: false,
            message: 'Something went wrong',
            err
        })
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser
}