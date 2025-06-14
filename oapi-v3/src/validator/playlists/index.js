const InvariantError = require('../../exceptions/InvariantError')
const { PlaylistPayloadSchema, PlaylistSongPayloadSchema } = require('./schema')

const PlaylistValidator = {
    validatePlaylistPayload: (payload) => {
        const validationResult = PlaylistPayloadSchema.validate(payload)
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, 400)
        }
    },

    validatePlaylistSongPayload: (payload) => {
        const validationResult = PlaylistSongPayloadSchema.validate(payload)
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message, 400)
        }
    },
}

module.exports = PlaylistValidator
