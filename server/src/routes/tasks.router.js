import express      from 'express';
import { getTasks } from '../controllers/task.controller.js';
import createQueryOptions from '../middlewares/validation/createQueryOptionsMW.js'

const tasksRouter = express.Router();

tasksRouter.get('',
                createQueryOptions,
                getTasks);

export default tasksRouter;