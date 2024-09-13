import express from 'express';

import {
  getUserInfo,
  updateUserInfo,
  updatePassword,
} from '../router_handler/user_info.js';

const router = express.Router();

router.get('/userInfo', getUserInfo);

router.put('/userInfo', updateUserInfo);

router.put('/password', updatePassword);

export default router;
