import { Router } from "express";
import { userController } from "./user.controller";

const userRouter = Router()

userRouter.post('/create-user', userController.createUser)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getSingleUser)
userRouter.patch('/:id', userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

export default userRouter