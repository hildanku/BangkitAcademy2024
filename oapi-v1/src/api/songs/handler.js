const autoBind = require('auto-bind')
const extractSongData = require('../../utils/lib')

class SongsHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

        autoBind(this)
    }

    async postSongHandler(request, h) {
        console.log(request.payload)
        const validationResult = this._validator.validateSongPayload(request.payload)

        if (validationResult.error) {
            const response = h.response({
                status: 'fail',
                message: validationResult.error.message,
            })
            response.code(400)
            return response
        }

        const songData = extractSongData(request.payload)
        const songId = await this._service.addSong(songData)

        const response = h.response({
            status: 'success',
            message: 'Lagu berhasil ditambahkan',
            data: {
                songId,
            },
        })
        response.code(201)
        return response
    }

    async getSongsHandler(request) {
        const { title = '', performer = '' } = request.query

        if (title || performer) {
            const searchedSongs = await this._service.searchSongs({ title, performer })
            return {
                status: 'success',
                data: {
                    songs: searchedSongs,
                },
            }
        }

        const songs = await this._service.getSongs()
        const mappingSongs = songs.map(({ id, title, performer }) => ({ id, title, performer }))

        return {
            status: 'success',
            data: {
                songs: mappingSongs,
            },
        }
    }

    async getSongByIdHandler(request, h) {
        const { id } = request.params
        const song = await this._service.getSongById(id)

        if (!song) {
            const response = h.response({
                status: 'fail',
                message: 'Lagu tidak ditemukan',
            })
            response.code(404)
            return response
        }

        return {
            status: 'success',
            data: {
                song,
            },
        }
    }

    async putSongByIdHandler(request, h) {
        const { id } = request.params;
        const validationResult = this._validator.validateSongPayload(request.payload)

        if (validationResult.error) {
            const response = h.response({
                status: 'fail',
                message: validationResult.error.message,
            })
            response.code(400)
            return response
        }

        const songData = extractSongData(request.payload)

        const songId = await this._service.updateSongById(id, songData)

        if (!songId) {
            const response = h.response({
                status: 'fail',
                message: 'Gagal memperbarui lagu. Id tidak ditemukan',
            })
            response.code(404)
            return response
        }

        return {
            status: 'success',
            message: 'Lagu berhasil diperbarui',
        }
    }

    async deleteSongByIdHandler(request, h) {
        const { id } = request.params

        const songId = await this._service.deleteSongById(id)

        if (songId === null) {
            const response = h.response({
                status: 'fail',
                message: 'Lagu tidak ditemukan',
            })
            response.code(404)
            return response
        }

        const successResponse = h.response({
            status: 'success',
            message: 'Lagu berhasil dihapus',
        })
        successResponse.code(200)
        return successResponse
    }
}
module.exports = SongsHandler
