
import Joi from '@hapi/joi';

export default function createValidationMW (req, res, next) {

  try {
    const getOptions = req.query;

    /*Тут должна быть валидация*/

    req.body.optionsGet = getOptions;

    next();
  } catch (e) {
    next( e );
  }

}