import { StatusCodes } from 'http-status-codes';
import { HttpError } from './http-error.error';

export class BadRequestError extends HttpError {
  statusCode = StatusCodes.BAD_REQUEST;
}
