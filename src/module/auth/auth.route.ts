import { Router } from "express"
import validateRequest from "../../middlewares/validateRequest"
import { userValidation } from "../user/user.validation"
import { authController } from "./auth.controller"
import { AuthValidation } from "./auth.validation"

const authRouter = Router()
authRouter.post('/register',validateRequest(userValidation.userValidationSchema),authController.register)
authRouter.post('/login',validateRequest(AuthValidation.loginValidationSchema),authController.login)


export default authRouter
