/*проверяет данные на корректрность*/

/**
 *
 * @param {Joi} schema
 * @return {function(*=): function(...[*]=)}
 */
import { ACTION } from '../../constants';

export default function createValidationMW (schema) {
  return (action = ACTION.CREATE) => {
    return async (req, res, next) => {
      try {
        req.body = await schema.validateAsync( req.body, {
          context: {
            isCreateMode: action === ACTION.CREATE
          }
        } );
        next();
      } catch (e) {
        next( e );
      }
    };
  };
}
