import express from 'express';

import cors from 'cors';

import morgan from 'morgan';

import jwt from 'express-jwt';

import APP_CONFIG from './config.js';

import user from './router/user.js';
import user_info from './router/user_info.js';

const app = express();

app.use(cors());

app.use(morgan('dev'));

app.use(
  jwt
    .expressjwt({
      secret: APP_CONFIG.JWT_SECRET_KEY,
      algorithms: ['HS256'],
    })
    .unless({ path: [/^\/token\//] }),
);

app.use(express.urlencoded({ extended: false }));

app.use('/token', user);
app.use('/api', user_info);

app.use((err, req, res, next) => {
  console.log(err);

  console.log(Object.entries(err));

  if (err.status === 401) {
    return res.send({
      status: 401,
      success: false,
      message: '身份认证失败！',
    });
  }

  res.send({
    status: 500,
    success: false,
    message: err,
  });

  next();
});

app.listen(APP_CONFIG.PORT, () => {
  console.log(`running at http://127.0.0.1:${APP_CONFIG.PORT}`);
});
