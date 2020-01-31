import express             from 'express';
import * as TaskController from '../controllers/task.controller.js';
import createValidationMW  from '../middlewares/validation/';
import schemas             from '../utils/validation';
import { ACTION, ENTITY }  from '../constants';
import checkPermissions    from '../middlewares/permission/checkPermissions.js';

const taskRouter = express.Router();
const checkTaskPermissions = checkPermissions( ENTITY.TASK );

taskRouter.post( '/',
                 checkTaskPermissions( ACTION.CREATE ),
                 createValidationMW( schemas.taskSchema )(),
                 TaskController.createTask
);
taskRouter.patch( '/:taskId',
                  checkTaskPermissions( ACTION.READ ),
                  createValidationMW( schemas.taskSchema )( false ),
                  updateTask
);
taskRouter.get( '/:taskId',
                checkTaskPermissions( ACTION.UPDATE ),
                TaskController.getTask
);
taskRouter.delete( '/:taskId',
                   checkTaskPermissions( ACTION.DELETE ),
                   TaskController.deleteTask
);

export default taskRouter;