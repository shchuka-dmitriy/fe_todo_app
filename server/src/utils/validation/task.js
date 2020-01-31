import Joi     from '@hapi/joi';

const valuesSchema = Joi.string().trim().min( 1 ).max( 255 );
const deadLineSchema = Joi.date().greater( 'now' );

export default Joi.object( {
                             isDone: Joi.boolean().label('Is done').optional(),
                             value: valuesSchema.optional().when( '$isCreateMode', {
                               then: valuesSchema.required()
                             } ),
                             deadline: deadLineSchema.optional().when( '$isCreateMode', {
                               then: deadLineSchema.required()
                             } ),
                           } ).min( 1 ).max( 3 );