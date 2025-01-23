const Joi = require('joi');

const resourceSchema = Joi.object({
    title: Joi.string().max(255).required().messages({
        'string.empty': 'Title is required.',
        'string.max': 'Title cannot exceed 255 characters.',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required.',
    }),
});

module.exports = {
    resourceSchema,
};
