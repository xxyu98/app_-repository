import sql from '../db/sql.js';

import APP_CONFIG from '../config.js';

const table_user = APP_CONFIG.TABLE.USER;

export const getUserInfo = (req, res) => {
  const sqlStr = `select * from ${table_user} where id=?`;

  sql.query(sqlStr, req.auth.id, (err, results) => {
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
