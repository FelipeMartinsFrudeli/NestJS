import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Response } from "express";

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const messageError = exception.meta?.cause ?? exception.message;

    if (exception.code === 'P2025') {
      return response.status(404).json({
        statusCode: 404,
        message: messageError
      })
    }

    response.status(500).json({
      statusCode: 500,
      message: messageError
    })
  }
}