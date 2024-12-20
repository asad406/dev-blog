import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest"
import { userValidation } from "../user/user.validation"
import { authController } from "./auth.controller"

const authRouter = Router()
authRouter.post('/register',validateRequest(userValidation.userValidationSchema),authController.register)

export default authRouter
