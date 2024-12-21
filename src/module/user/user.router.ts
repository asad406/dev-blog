import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import auth from "../../middlewares/auth";
import { blogController } from "../blog/blog.controller";

const userRouter = Router()

userRouter.post('/create-admin',validateRequest(userValidation.userValidationSchema), userController.createUser)
userRouter.get('/:id', userController.getSingleUser)
userRouter.patch('/users/:id/block',auth('admin'),validateRequest(userValidation.updateUserValidationSchema), userController.updateUser)
userRouter.delete('/blogs/:id',auth('admin'),blogController.deleteBlog)
userRouter.get('/',auth('admin'), userController.getAllUsers)

export default userRouter

/*
app.use('/api/auth', authRouter)
app.use('/api/admin', userRouter)
app.use('/api/blog', blogRouter)
*/