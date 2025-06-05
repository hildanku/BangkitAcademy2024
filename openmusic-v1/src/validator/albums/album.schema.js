const joi = require('joi')

const albumPayloadSchema = joi.object({
    name: joi.string().required(),
    year: joi.number().integer().required()
})

module.exports = { albumPayloadSchema }
