/*--  Это основной роутер. Он перенаправляет на другие роутеры, например на router/user.js  --*/

import express    from 'express';
import userRouter from './user.js';

const router = express.Router();
router.use('/user', userRouter);        //при запросе /user, перенаправлять на userRouter

export  default router;