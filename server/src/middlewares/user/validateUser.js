import { createUserSchema, updateUserSchema } from '../../utils/validation/userValidation.js';

export default async function validateUser (req, res, next) {
  try {
    req.body = await req.method.toUpperCase() === 'POST'
               ? createUserSchema                         /*если метод POST*/
               : updateUserSchema( req.body );            /*если метод не POST, например PUT*/
    next( new Error() );
  } catch (e) {
    next( e );
  }
}