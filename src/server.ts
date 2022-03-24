import mongoose from 'mongoose';
import 'reflect-metadata';
import config from '../config';
import app from './app';

const { mongo } = config;

const port = app.get('port');

process.on('uncaughtException', (exception) => {
  console.error('uncaughtException', exception.stack || exception, new Error().stack);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('unhandledRejection at: ', promise, 'reason:', reason);
});

mongoose.connect(mongo.path).then(() => {
  app.listen(port, () => {
    console.log(`Successful start. Server started: ${port}`);
  });
});
