import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { RecordController } from '../controllers';

const recordController = new RecordController();
const recordRouter = express.Router({ mergeParams: true });

recordRouter.route('/').post(async ({ body }, res, next) => {
  recordController
    .findRecords({ ...body })
    .then((response) => res.status(StatusCodes.OK).json(response))
    .catch(next);
});

export default recordRouter;
