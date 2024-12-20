import { Router } from "express";
import { blogController } from "./blog.controller";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidation } from "./blog.validation";


const blogRouter = Router()

blogRouter.post('/create-blog',validateRequest(blogValidation.blogValidationSchema), blogController.createBlog)
blogRouter.get('/', blogController.getAllBlog)
blogRouter.get('/:id', blogController.getSingleBlog)
blogRouter.patch('/:id',validateRequest(blogValidation.updateBlogValidationSchema), blogController.updateBlog)
blogRouter.delete('/:id', blogController.deleteBlog)

export default blogRouter