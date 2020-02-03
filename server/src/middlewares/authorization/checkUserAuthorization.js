import AppErrors from '../../utils/applicationErrors';

export default function (req, res, next) {
  try {

    if (req.get( 'Authorization' )) {
      req.authorizationData = {
        id: req.get( 'Authorization' )
      };
      return next();
    }

    next( new AppErrors.UnauthorizedError() );

  } catch (e) {
    next( e );
  }
}