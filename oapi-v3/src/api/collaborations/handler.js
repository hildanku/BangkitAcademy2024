const autoBind = require('auto-bind')

class CollaborationsHandler {
    constructor(collaborationsService, playlistsService, validator) {
        this._collaborationsService = collaborationsService
        this._playlistService = playlistsService
        this._validator = validator

        autoBind(this)
    }

    async postCollaborationHandler(request, h) {
        this._validator.validateCollaborationPayload(request.payload)
        const { id: username } = request.auth.credentials
        const { playlistId, userId } = request.payload

        await this._playlistService.verifyPlaylistAccess(playlistId, username)
        const collaborationId = await this._collaborationsService.addCollaboration(
            playlistId,
            userId,

        )
        await this._collaborationsService.addCollaborationActivity(
            playlistId,
            userId,
            null,
            'add',
        )

        const response = h.response({
            status: 'success',
            message: 'Kolaborasi berhasil ditambahkan',
            data: {
                collaborationId,
            },
        })
        response.code(201)
        return response
    }

    async deleteCollaborationHandler(request) {
        this._validator.validateCollaborationPayload(request.payload)
        const { id: username } = request.auth.credentials
        const { playlistId, userId } = request.payload

        await this._playlistService.verifyPlaylistOwner(playlistId, username)
        await this._collaborationsService.deleteCollaboration(playlistId, userId)

        await this._collaborationsService.deleteCollaborationActivity(
            playlistId,
            userId,
            null,
            'delete',
        )

        return {
            status: 'success',
            message: 'Kolaborasi berhasil dihapus',
        }
    }

    async getCollaborationActivitiesHandler(request, h) {
        const { id: playlistId } = request.params
        const { id: credentialId } = request.auth.credentials

        await this._playlistService.verifyPlaylistAccess(playlistId, credentialId)

        const activities = await this._collaborationsService.getCollaborationActivities(playlistId)

        return h.response({
            status: 'success',
            data: {
                playlistId,
                activities,
            },
        })
    }
}

module.exports = CollaborationsHandler
