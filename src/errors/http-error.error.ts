import { StatusCodes } from 'http-status-codes';

export class HttpError extends Error {
  statusCode: StatusCodes;
}
