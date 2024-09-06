import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import sql from '../db/sql.js';

import APP_CONFIG from '../config.js';

const table_user = APP_CONFIG.TABLE.USER;

export function register(req, res) {
  const userInfo = req.body;

  const sqlStr = `select * from ${table_user} where username=?`;

  sql.query(sqlStr, [userInfo.username], (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: err.message,
      });
    }

    if (results.length > 0) {
      return res.send({
        success: false,
        message: '用户名被占用，请更换用户名',
      });
    }

    userInfo.password = bcrypt.hashSync(userInfo.password, 10);

    const sqlStr = `insert into ${table_user} set?`;
    sql.query(
      sqlStr,
      {
        username: userInfo.username,
        password: userInfo.password,
      },
      (err, results) => {
        if (err)
          return res.send({
            success: false,
            message: err.message,
          });

        if (results.affectedRows !== 1) {
          return res.send({
            success: false,
            message: '注册失败，请稍后再试',
          });
        }
        res.send({
          success: true,
          message: '注册成功！',
        });
      },
    );
  });
}

export function login(req, res) {
  const sqlStr = `select * from ${table_user} where username=?`;

  sql.query(sqlStr, req.body.username, (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: err.message,
      });
    }

    if (results.length !== 1) {
      return res.send({
        status: 400,
        success: false,
        message: '账号不存在',
      });
    }

    const flag = bcrypt.compareSync(req.body.password, results[0].password);

    if (!flag) {
      return res.send({
        status: 400,
        success: false,
        message: '账号或密码错误',
      });
    }

    const userInfo = { ...results[0] };

    delete userInfo['password'];

    const tokenStr = jwt.sign(userInfo, APP_CONFIG.JWT_SECRET_KEY, {
      expiresIn: APP_CONFIG.JWT_EXPIRES_IN,
    });

    res.send({
      status: 200,
      success: true,
      message: '登录成功',
      data: {
        token: tokenStr,
      },
    });
  });
}
