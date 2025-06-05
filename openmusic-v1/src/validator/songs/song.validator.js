const { songPayloadSchema } = require("./song.schema")

const SongValidator = {
    validateSongPayload: (payload) => {
        const validationResult = songPayloadSchema.validate(payload)
        return validationResult
    }
}

module.exports = SongValidator
