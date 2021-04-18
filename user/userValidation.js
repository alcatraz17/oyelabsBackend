const Joi = require("joi");  // Importing validation package

const validator = (schema) => async (payload) => {
    try {
        await schema.validateAsync(payload, { abortEarly: false });
    } catch (error) {
        const formattedMessage = error.details.map((err) => err.message);
        throw formattedMessage;
    }
};

// Specifying the validation schema
const userValidator = (payload) => {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        phone: Joi.number().min(7000000000).max(9999999999).required(),
        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ["com", "net"] }
            })
            .required(),
        password: Joi.string().min(8).max(20).required()
    });
    return validator(schema)(payload);
};

module.exports = userValidator;
