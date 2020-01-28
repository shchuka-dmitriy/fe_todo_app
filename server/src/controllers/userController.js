import { User } from './../db/models';

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
    next( new Error() );           //это нужно чтобы приложение не зависло если юзер не создался.   или res.end(); но лучше "next( new Error() );". НО! если дальше есть код то нужно писать "return next( new Error() );" чтобы он не выполнялся

  } catch (e) {
    next( e );
  }
}