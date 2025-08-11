const Joi = require("joi")

const userSchema = Joi.object({
    name: Joi.string().min(3).required().messages({
        'string.empty': 'o NOME não pode ser vazio',
        'string.min': 'o NOME deve conter pelo menos 3 caracteres',
        'any.required': "o NOME é obrigatório"
    }),
    pword: Joi.string().min(8).required().messages({
        'string.empty': 'o campo SENHA tem que ser preenchido',
        'string.min': 'a SENHA deve conter pelo menos 8 caracteres',
        'any.required': 'A SENHA é um campo obrigatório'
    }),
    email: Joi.string().min(8).required().messages({
        'string.empty': 'o campo EMAIL tem que ser preenchido',
        'any.required': 'o EMAIL é um campo obrigatório'
    })
});

module.exports = {carSchema};