import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req:Request, res: Response, next: NextFunction) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "api not found",
        statusCode: StatusCodes.NOT_FOUND,
        error: "",
    })
}

export default notFound