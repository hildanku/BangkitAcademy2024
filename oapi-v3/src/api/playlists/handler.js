const autoBind = require('auto-bind')

class PlaylistsHandler {
    constructor(playlistsService, collaborationsService, validator) {
        this._playlistsService = playlistsService
        this._collaborationsService = collaborationsService
        this._validator = validator

        autoBind(this)
    }

    async postPlaylistHandler(request, h) {
        const { name } = request.payload
        const { id: owner } = request.auth.credentials

        this._validator.validatePlaylistPayload(request.payload)

        const playlistId = await this._playlistsService.addPlaylists({
            name,
            owner,
        })

        const response = h.response({
            status: 'success',
            message: 'Playlist berhasil ditambahkan',
            data: {
                playlistId,
            },
        })
        response.code(201)
        return response
    }

    async getPlaylistsHandler(request) {
        const { id: credentialId } = request.auth.credentials
        const playlists = await this._playlistsService.getPlaylists(credentialId)

        console.log('Number of Playlists:', playlists.length)

        return {
            status: 'success',
            data: {
                playlists,
            },
        }
    }

    async deletePlaylistByIdHandler(request) {
        const { id } = request.params
        const { id: credentialId } = request.auth.credentials

        await this._playlistsService.verifyPlaylistOwner(id, credentialId)
        await this._playlistsService.deletePlaylistById(id, credentialId)

        return {
            status: 'success',
            message: 'Playlist berhasil dihapus',
        }
    }

    async postPlaylistSongsByIdHandler(request, h) {
        this._validator.validatePlaylistSongPayload(request.payload)
        const { id: playlistId } = request.params
        const { songId } = request.payload
        const { id: owner } = request.auth.credentials

        await this._playlistsService.verifyPlaylistAccess(playlistId, owner)
        await this._playlistsService.verifySongIsExist(songId)
        await this._playlistsService.addPlaylistsSong(playlistId, songId)

        const userId = owner
        const action = 'add'
        await this._collaborationsService.addCollaborationActivity(
            playlistId,
            songId,
            userId,
            action,
        )

        const response = h.response({
            status: 'success',
            message: 'Playlist song berhasil ditambahkan',
        })
        response.code(201)
        return response
    }

    async getPlaylistSongsByIdHandler(request) {
        const { id } = request.params
        const { id: owner } = request.auth.credentials

        await this._playlistsService.verifyPlaylistOwner(id, owner)

        const playlist = await this._playlistsService.getPlaylistById(id)

        return {
            status: 'success',
            data: {
                playlist,
            },
        }
    }

    async deletePlaylistSongsByIdHandler(request) {
        this._validator.validatePlaylistSongPayload(request.payload)
        const { id: playlistId } = request.params
        const { songId } = request.payload
        const { id: owner } = request.auth.credentials

        await this._playlistsService.verifyPlaylistAccess(playlistId, owner)
        await this._playlistsService.deletePlaylistSongById(playlistId, songId)

        const userId = owner
        const action = 'delete'
        await this._collaborationsService.addCollaborationActivity(
            playlistId,
            songId,
            userId,
            action,
        )

        return {
            status: 'success',
            message: 'Playlist song berhasil dihapus',
        }
    }
}

module.exports = PlaylistsHandler
