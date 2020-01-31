import schemas from '../../utils/validation';

function createValidationMW (schema) {

  return (isCreateMode = true) => {

    return async (req, res, next) => {
      try {
        req.body = await schemas.userSchema.validateAsync( req.body, {
          context: {
            isCreateMode,
          }
        } );
        next();
      } catch (e) {
        next( e );
      }
    };
  };
}


