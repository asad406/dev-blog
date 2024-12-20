/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import config from "../config"
import { TErrorSource } from "../interface/error"
import { ZodError } from "zod"
import handleZodError from "../errors/handleZodError"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalErrorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500
  let message = "Something went wrong"

  let errorSource: TErrorSource = [{
    path: '',
    message: "Something went wrong"
  }]

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSource = simplifiedError.errorSource
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  })
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