import '../env/env';
import dotenv from 'dotenv';
import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';


import { routes } from './api';


import models from './models';

/* 환경변수 설정 */
dotenv.config();

/* express 서버 설정 */
const app = express();



if (process.env.DB_SYNC || process.env.DB_SYNC === 'false') {
  console.log('Sequelize Initialize');
  models.sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Sequelize Success');
    })
    .catch(err => {
      console.log('Sequelize Error : ', err);
    })
}

app.disable('x-powered-by');

app.use(
  cors({
    origin: [
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


routes.forEach(route => {
  app[route.method](
    route.path,
    [...route.middleware],
    route.controller
  );
})


app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
