import Joi from '@hapi/joi';
/*
* WHERE
* OFFSET
* LIMIT
* ORDER
* */


export default Joi.object({
  where: Joi.string().label('where').required(true)

                          });