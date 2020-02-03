import express                                                     from 'express';
import { createUser, deleteUserByPk, getUserByPk, updateUserByPk } from '../controllers/user.controller.js';
import createValidationMW
                                                                   from '../middlewares/validation/createValidationMW.js';
import schemas            from '../utils/validation';
import checkPermissions   from '../middlewares/permission/createPermissions.js';
import { ACTION, ENTITY } from '../constants';

const userRouter = express.Router();

const createUserPermissions = checkPermissions( ENTITY.USER );
const createUserValidationMW = createValidationMW(schemas.userSchema);

userRouter.post( '/',
                 createUserPermissions( ACTION.CREATE ),
                 createUserValidationMW( ACTION.CREATE ),
                 createUser
);
userRouter.patch( '/:userId',
                  createUserPermissions( ACTION.UPDATE ),
                  createUserValidationMW( ACTION.UPDATE ),
                  updateUserByPk
);
userRouter.get( '/:userId',
                createUserPermissions( ACTION.READ ),
                getUserByPk
);

userRouter.delete( '/:userId',
                   createUserPermissions( ACTION.DELETE ),
                   deleteUserByPk
);

export default userRouter;