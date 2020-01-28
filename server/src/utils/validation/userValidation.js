import Joi                                 from '@hapi/joi';
import { LOGIN_PATTERN, PASSWORD_PATTERN } from '../../constants';

const nameSchema = Joi.object( {
                                 firstName: Joi.string()
                                               .pattern( /^[A-Z][a-z]{0,63}$/ )       /*проверяем регуляркой*/
                               } );
const emailSchema = Joi.string().email();
const loginSchema = Joi.string()
                       .pattern( LOGIN_PATTERN );
const passwordSchema = Joi.string()
                          .pattern( PASSWORD_PATTERN );

export const createUserSchema = Joi.object( {
                                              firstName: nameSchema,
                                              lastName: nameSchema,
                                              email: emailSchema,
                                              login: loginSchema.required(),
                                              password: passwordSchema.required()
                                            } );

export const updateUserSchema = Joi.object( {
                                              firstName: nameSchema,
                                              lastName: nameSchema,
                                              email: emailSchema,
                                              login: loginSchema,
                                              password: passwordSchema
                                            } ).min( 1 ).max( 5 );