import { Request, Response } from 'express';
import { blogService } from './blog.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import Blog from './blog.model';
import AppError from '../../errors/AppError';

const createBlog = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const payload = req.body;
  payload.author = userId;
  const result = await blogService.createBlogIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: 'Blog create successfully',
    data: {
      _id: result._id,
      title: result.title,
      content: result.content,
      author: result.author,
    },
  });
});

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
  const result = await blogService.getAllBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blogs retrieved successfully',
    data: result,
  });
});
const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  //check logged in user author of updating blog
  const userId = req.user?.userId;

  const isIdExists = await Blog.findById(id);
  if (isIdExists?.author?.toString() !== userId) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized.');
  }

  const result = await blogService.updateBlogToDB(id, data);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog update successfully',
    data: {
      _id: result?._id,
      title: result?.title,
      content: result?.content,
      author: result?.author,
    },
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  //check logged in user author of deleting blog
  const userId = req.user?.userId;
  const isIdExists = await Blog.findById(id);
  if (isIdExists?.author?.toString() !== userId) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized.');
  }
  await blogService.deleteBlogFromDB(id, { isPublished: false });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: 'Blog delete successfully',
  });
});

export const blogController = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
