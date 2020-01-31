/*
import express    from 'express';
import userRouter from './user.router.js';

const router = express.Router();
router.use('/user', userRouter);        //при запросе /user, перенаправлять на userRouter

export  default router;*/


import express                from 'express';
import AppErrors              from '../utils/applicationErrors';
import userRouter         from './user.router.js';
import checkAuthorization from '../middlewares/authorization/checkUserAuthorization.js';
import taskRouter         from './task.router.js';

const router = express.Router();

router.use( checkAuthorization );

router.use( '/user', userRouter );
router.use( '/task', taskRouter );

router.use( '/*', function (req, res, next) {
  next( new AppErrors.NotFoundError() );
} );

export default router;