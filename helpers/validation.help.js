import Joi from '@hapi/joi';

export const accountNotRequiredSchema = Joi.object({
    name: Joi.string().min(3).max(100).regex(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/),
    agency: Joi.number().min(1).max(100),
    account: Joi.number().min(1).max(10000),
    accountTo: Joi.number().min(1).max(10000),
    accountFrom: Joi.number().min(1).max(10000),
    value: Joi.number().min(1)
});

export const validate = (data, schema) => {
    const {error} = schema.validate(data);

    if (error){
        throw new Error(error.details[0].message)
    }
    return data;
}