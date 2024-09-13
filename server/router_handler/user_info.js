import bcrypt from 'bcrypt';

import sql from '../db/sql.js';

import APP_CONFIG from '../config.js';

const table_user = APP_CONFIG.TABLE.USER;

export const getUserInfo = (req, res) => {
  const sqlStr = `select * from ${table_user} where userId=?`;

  sql.query(sqlStr, req.auth.userId, (err, results) => {
    if (err) {
      return res.send({
        status: 500,
        success: false,
        message: err,
      });
    }

    if (results.length != 1) {
      return res.send({
        status: 400,
        success: false,
        message: '获取用户信息失败',
      });
    }

    const userInfo = { ...results[0] };

    delete userInfo['password'];

    res.send({
      status: 200,
      success: true,
      message: '获取用户信息成功！',
      data: userInfo,
    });
  });
};

export const updateUserInfo = (req, res) => {
  const sqlStr = `update ${table_user} set ? where userId=?`;

  sql.query(sqlStr, [req.body, req.auth.userId], (err, results) => {
    if (err)
      return res.send({
        success: false,
        message: err,
      });
    if (results.affectedRows !== 1)
      return res.send({
        success: false,
        message: '更新失败',
      });

    return res.send({
      success: true,
      message: '用户信息更新成功！',
    });
  });
};

export const updatePassword = (req, res) => {
  const sqlStr = `select * from ${table_user} where userId=?`;

  sql.query(sqlStr, req.auth.userId, (err, results) => {
    if (err) {
      return res.send({
        success: false,
        message: err,
      });
    }

    if (results.length !== 1) {
      return res.send({
        success: false,
        message: '用户不存在',
      });
    }

    console.log('flag', req.body.oldPwd, results[0].password);

    const flag = bcrypt.compareSync(req.body.oldPwd, results[0].password);

    if (!flag) {
      return res.send({
        success: false,
        message: '原密码错误',
      });
    }

    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);

    const sqlStr = `update ${table_user} set password = ? where userId = ?`;

    sql.query(sqlStr, [newPwd, req.auth.userId], (err, results) => {
      if (err)
        return res.send({
          success: false,
          message: err,
        });

      if (results.affectedRows !== 1) {
        return res.send({
          success: false,
          message: '密码修改失败',
        });
      }

      res.send({
        success: true,
        message: '密码更新成功',
      });
    });
  });
};
