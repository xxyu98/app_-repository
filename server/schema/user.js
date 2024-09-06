import { body, validationResult } from 'express-validator';

export const userSchema = [
  body('username')
    .isLength({ min: 2, max: 30 })
    .withMessage('用户名必须是2-30个字符'),

  body('password').isLength({ min: 6 }).withMessage('密码必须至少6个字符'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({
        status: 400,
        success: false,
        // message : errors.array().map(err => err.msg).join(', '), // 将错误信息合并为一个字符串
        message: errors.array()[0].msg,
      });
    }

    next();
  },
];
