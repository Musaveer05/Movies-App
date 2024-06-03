const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: ['com'] } })
        .messages({
            'string.email': 'Email must be a valid email address. only ".com" is allowed',
            'string.domain': 'Email must end with .com domain.',
        }),

    password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'))
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            'string.empty': 'Password is required.',
        })
});

module.exports = schema;
