import express from 'express';

import { register, login } from '../router_handler/user.js';

import { userSchema } from '../schema/user.js';

const router = express.Router();

router.post('/register', userSchema, register);

router.post('/login', userSchema, login);

export default router;
