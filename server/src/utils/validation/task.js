import Joi from '@hapi/joi';

const valueSchema = Joi.string().trim().min( 1 ).max( 255 );
const deadlineSchema = Joi.date();

export default Joi.object( {
                             isDone: Joi.boolean().label( 'Is done' ).optional(),
                             value: valueSchema.optional().when( '$isCreateMode', {
                               then: valueSchema.required()
                             } ),
                             deadline: deadlineSchema.optional().when( '$isCreateMode', {
                               then: deadlineSchema.required()
                             } ),
                           } ).min( 1 ).max( 3 );