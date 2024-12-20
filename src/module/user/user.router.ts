import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const userRouter = Router()

userRouter.post('/create-user',validateRequest(userValidation.userValidationSchema), userController.createUser)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getSingleUser)
userRouter.patch('/:id',validateRequest(userValidation.updateUserValidationSchema), userController.updateUser)
userRouter.delete('/:id', userController.deleteUser)

export default userRouter