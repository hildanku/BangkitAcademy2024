const autoBind = require('auto-bind')

class AlbumsHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

        autoBind(this)
    }

    async storeAlbum(request, h) {
        this._validator.validateAlbumPayload(request.payload)
        const { id = 'untitled', name, year } = request.payload

        const albumId = await this._service.addAlbum({ id, name, year })

        const response = h.response({
            status: 'success',
            message: 'Album berhasil ditambahkan',
            data: {
                albumId,
            },
        })
        response.code(201)
        return response
    }

    async updateAlbumById(request) {
        this._validator.validateAlbumPayload(request.payload)
        const { id } = request.params
        const { name, year } = request.payload

        await this._service.editAlbumById(id, { name, year })

        return {
            status: 'success',
            message: 'Album berhasil diperbarui',
        }
    }

    async deleteAlbumById(request) {
        const { id } = request.params

        await this._service.deleteAlbumById(id)

        return {
            status: 'success',
            message: 'Album berhasil dihapus',
        }
    }

    async getAlbumById(request) {
        const { id } = request.params
        const album = await this._service.getAlbumById(id)
        const songs = await this._service.getSongList(id)
        album.songs = songs
        return {
            status: 'success',
            data: {
                album,
            },
        }
    }
}

module.exports = AlbumsHandler
