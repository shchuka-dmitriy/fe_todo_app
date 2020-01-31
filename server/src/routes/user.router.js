import express                                                     from 'express';
import { createUser, deleteUserByPk, getUserByPk, updateUserByPk } from '../controllers/user.controller.js';
import { validateUserOnCreate, validateUserOnUpdate }              from '../middlewares/user/validateUser.js';
import checkPermissions                                            from '../middlewares/permission/checkPermissions.js';
import { ACTION, ENTITY }                                          from '../constants';
import schemas                                                     from '../utils/validation';

const userRouter = express.Router();
const checkUserPermissions = checkPermissions( ENTITY.USER );

userRouter.post( '/',
                 checkUserPermissions( ACTION.CREATE ),
                 validateUserOnCreate,
                 createUser
);
userRouter.patch( '/:userId',
                  checkUserPermissions( ACTION.UPDATE ),
                  validateUserOnUpdate,
                  updateUserByPk
);
userRouter.get( '/:userId',
                checkUserPermissions( ACTION.READ ),
                getUserByPk
);

userRouter.delete( '/:userId',
                   checkUserPermissions( ACTION.DELETE ),
                   deleteUserByPk
);

export default userRouter;