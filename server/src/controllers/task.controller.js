import { Task }  from '../models';
import appErrors from '../utils/applicationErrors';

export async function createTask (req, res, next) {
  try {
    const { authorizationData: { id: userId }, body: taskData } = req;      /*тоже что и const userId = req.authorizationData.id*/
    const createdTask = await Task.create( taskData );
    if (createdTask) {
      return res.status( 201 ).send( createdTask );
    }
    next( new appErrors.BadRequestError() );
  } catch (e) {
    next( e );
  }
}

export async function getTask (req, res, next) {
  try {
    const { params: { taskId } } = req;
    const foundTask = await Task.findByPk( taskId );
    if (foundTask) {
      return res.send( foundTask );
    }
    next( new appErrors.NotFoundError( 'Task' ) );
  } catch (e) {
    next( e );
  }
}

export async function updateTask (req, res, next) {
  try {
    const { params: { taskId }, body: taskData } = req;
    const [updatedRowsCount, updatedRows] = await Task.update( taskData, {
      where: {
        id: taskId
      }
    } );
    if (updatedRowsCount) {
      return res.send( updatedRows[0] );
    }
    next( new appErrors.NotFoundError( 'Task' ) );
  } catch (e) {
    next( e );
  }
}

export async function deleteTask (req, res, next) {
  try {
    const { params: { taskId } } = req;
    const deleteRowsCount = await Task.update( taskData, {
      where: {
        id: taskId
      }
    } );
    if (updatedRowsCount) {
      return res.send( updatedRows[0] );
    }
    next( new appErrors.NotFoundError( 'Task' ) );
  } catch (e) {
    next( e );
  }
}




/*

//-----------------------------Через классы---------------------

class TaskController extends Controller {
  constructor () {
    super();
  }

  async getTask (req, res, next) {
  try {
    const { params: { taskId } } = req;
    const foundTask = await Task.findByPk( taskId );
    if (foundTask) {
      return res.send( foundTask );
    }
    next( new appErrors.NotFoundError( 'Task' ) );
  } catch (e) {
    next( e );
  }
}

  async updateTask (req, res, next) {
  try {
    const { params: { taskId }, body: taskData } = req;
    const [updatedRowsCount, updatedRows] = await Task.update( taskData, {
      where: {
        id: taskId
      }
    } );
    if (updatedRowsCount) {
      return res.send( updatedRows[0] );
    }
    next( new appErrors.NotFoundError( 'Task' ) );
  } catch (e) {
    next( e );
  }
}

  async deleteTask (req, res, next) {
  try {
    const { params: { taskId } } = req;
    const deleteRowsCount = await Task.update( taskData, {
      where: {
        id: taskId
      }
    } );
    if (updatedRowsCount) {
      return res.send( updatedRows[0] );
    }
    next( new appErrors.NotFoundError( 'Task' ) );
  } catch (e) {
    next( e );
  }
}

export default new TaskController();*/
