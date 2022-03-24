import express from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../build/swagger.json';
import config from '../config';
import { HttpError } from './errors/http-error.error';
import router from './routes';

const { port } = config;

const app = express();

app.set('port', port);
app.use(express.json({ strict: false }));

app.use(router);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.log(err);
  let errorBody = {
    code: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
  };
  if (err instanceof SyntaxError) {
    errorBody = {
      code: StatusCodes.BAD_REQUEST,
      msg: getReasonPhrase(err.message),
    };
  }

  if (err instanceof HttpError) {
    errorBody = {
      code: err.statusCode,
      msg: err.message,
    };
  }

  return res.status(StatusCodes.OK).json(errorBody);
});

export default app;
