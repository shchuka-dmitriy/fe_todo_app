import AppErrors from '../../utils/applicationErrors';

export default function (req, res, next) {
  try {
    const authorId = req.get( 'Authorization' );
    req.authorizationData = authorId
                            ? { id: authorId }
                            : false;

    if (req.authorizationData) {
      next();
    } else {
      next( new AppErrors.UnauthorizedError() );
    }
  } catch (e) {
    next( e );
  }
}