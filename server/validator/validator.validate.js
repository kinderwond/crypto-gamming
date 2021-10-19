const Joi = require('joi');

module.exports = {
    schema: (schema) =>
        (req, res, next) => {
            const { error } = schema.validate(req.body);

            if (!error) {
                next();
            } else {
                const { details } = error;
                const message = details.map(i => i.message).join(',');
                res.status(422).json({ error: message })
            }
        }
} 