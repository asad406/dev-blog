import { Router } from "express";
import { blogController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";
import auth from "../../middlewares/auth";


const blogRouter = Router()

blogRouter.post('/',auth('user'),validateRequest(blogValidation.blogValidationSchema), blogController.createBlog)
blogRouter.get('/', blogController.getAllBlog)
blogRouter.get('/:id', blogController.getSingleBlog)
blogRouter.patch('/:id',auth('user'),validateRequest(blogValidation.updateBlogValidationSchema), blogController.updateBlog)

blogRouter.delete('/blogs/:id',auth('admin'),blogController.deleteBlog)

export default blogRouter