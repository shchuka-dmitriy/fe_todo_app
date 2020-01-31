import { User }  from '../models';
import AppErrors from '../utils/applicationErrors';

export async function createUser (req, res, next) {             /*в req приходят данные в body для сохранения юзера*/
  try {
    const createdUser = await User.create( req.body );
    if (createdUser) {
      const userData = createdUser.get();
      delete userData.password;

      return res.status( 201 ).send( createdUser );
    }
    //next();           /*или next(err);    или next('router');*/

    //return new Error();
    //next( new Error() );           //это нужно чтобы приложение не зависло если юзер не создался.   или res.end(); но лучше "next( new Error() );". НО! если дальше есть код то нужно писать "return next( new Error() );" чтобы он не выполнялся

    next( new AppErrors.BadRequestError() );

  } catch (e) {
    next( e );
  }
}

export async function updateUserByPk (req, res, next) {
  try {
    const [updatedRowsCount, updatedRows] = await User.update( req.body, {
      where: {
        id: req.params.userId,
      },
      returning: true,
    } );
    if (updatedRowsCount) {
      const data = updatedRows[0].get();
      delete data.password;
      return res.send( data );
    }
    next( new AppErrors.NotFoundError( 'User' ) );
  } catch (e) {
    next( e );
  }

}

export async function getUserByPk (req, res, next) {
  try {
    const foundUser = await User.findByPk( req.params.userId, {
      attributes: {
        exclude: ['password']
      }
    } );
    if (foundUser) {

      return res.send( foundUser );
    }
    next( new AppErrors.NotFoundError( 'User' ) );
  } catch (e) {
    next( e );
  }

}

export async function deleteUserByPk (req, res, next) {
  try {
    const deletedRowsCount = await User.destroy( {
                                                   where: {
                                                     id: req.params.userId
                                                   }
                                                 } );
    if (deletedRowsCount) {
      return res.send( `${deletedRowsCount}` );
    }
    next( new AppErrors.NotFoundError( 'User' ) );

  } catch (e) {
    next( e );
  }

}
