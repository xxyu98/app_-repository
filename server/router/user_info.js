import express from 'express';

import { getUserInfo } from '../router_handler/user_info.js';

const router = express.Router();

router.get('/userInfo', getUserInfo);

export default router;
