/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import config from "../config"


// type TErrorResponse = {
//     success: boolean,
//     message: string,
//     statusCode: number,
//     error: any
    
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
    res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: err.message, statusCode: StatusCodes.BAD_REQUEST, error: err, stack: config.NODE_ENV === 'development' ? err?.stack : null, })
}








/*
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400, // or other relevant HTTP status code
  "error": {"details": "Additional error details, if applicable"},
  "stack": "error stack trace, if available"
}
*/