import express            from 'express';
import createValidationMW from '../middlewares/validation/createValidationMW.js';
import schemas            from '../utils/validation';
import * as TaskController from '../controllers/task.controller.js';
import createPermissions    from '../middlewares/permission/createPermissions.js';
import { ACTION, ENTITY }  from '../constants';

const taskRouter = express.Router();

const createTaskPermissions = createPermissions( ENTITY.TASK );

taskRouter.post( '/',
                 createTaskPermissions( ACTION.CREATE ),
                 createValidationMW( schemas.taskSchema )(),
                 TaskController.createTask,
);
taskRouter.get( '/:taskId',
                createTaskPermissions( ACTION.READ ),
                TaskController.getTask
);
taskRouter.patch( '/:taskId',
                  createTaskPermissions( ACTION.UPDATE ),
                  createValidationMW( schemas.taskSchema )( ACTION.UPDATE ),
                  TaskController.updateTask
);
taskRouter.delete( '/:taskId',
                   createTaskPermissions( ACTION.DELETE ),
                   TaskController.deleteTask
);

export default taskRouter;