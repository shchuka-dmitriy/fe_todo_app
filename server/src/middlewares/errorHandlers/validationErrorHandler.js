import { ValidationError } from '@hapi/joi';

export default function (err, req, res, next) {
  if (err instanceof ValidationError) {
    const { details: [errorObj] } = err;
    return res.status( 400 ).send( errorObj.type === 'string.pattern.base'
                                   ? `\"${errorObj.context.label}\" with value \"${errorObj.context.value}\" fails to match the required pattern`
                                   : errorObj.message );
  } else {
    next( err );
  }
}