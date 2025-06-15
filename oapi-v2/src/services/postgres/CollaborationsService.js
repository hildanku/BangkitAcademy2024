const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')
const AuthorizationError = require('../../exceptions/AuthorizationError')

class CollaborationsService {
    constructor() {
        this._pool = new Pool()
    }

    async verifyUserExist(userId) {
        const query = {
            text: 'SELECT id FROM users WHERE id = $1',
            values: [userId],
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('User tidak ditemukan')
        }
    }

    async verifyPlaylistExist(playlistId) {
        const query = {
            text: 'SELECT id FROM playlists WHERE id = $1',
            values: [playlistId],
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('Playlist tidak ditemukan')
        }
    }

    async addCollaboration(playlistId, userId) {
        console.log('[DEBUG] addCollaboration input:', { playlistId, userId })

        await this.verifyPlaylistExist(playlistId)
        await this.verifyUserExist(userId)

        const exists = await this._pool.query({
            text: 'SELECT id FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
            values: [playlistId, userId],
        })

        if (exists.rows.length) {
            throw new InvariantError('Kolaborasi sudah ada')
        }

        const id = `collab-${nanoid(16)}`
        const query = {
            text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, userId],
        }

        console.log('[DEBUG] Executing insert with values:', query.values)

        const result = await this._pool.query(query)

        console.log('[DEBUG] Insert result:', result.rows)

        if (!result.rows.length) {
            throw new InvariantError('Kolaborasi gagal ditambahkan')
        }

        return result.rows[0].id
    }


    async deleteCollaboration(playlistId, userId) {
        const query = {
            text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id',
            values: [playlistId, userId],
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new InvariantError('Kolaborasi gagal dihapus')
        }
    }

    async verifyCollaborator(playlistId, userId) {
        await this.verifyPlaylistExist(playlistId)
        const result = await this._pool.query({
            text: 'SELECT id FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
            values: [playlistId, userId],
        })
        if (!result.rows.length) {
            throw new AuthorizationError('Anda bukan kolaborator dari playlist ini')
        }
    }

    async getCollaborationActivities(playlistId) {
        const query = {
            text: `
        SELECT u.username, s.title, a.action, a.time
        FROM playlist_song_activities a
        JOIN users u ON a.user_id = u.id
        JOIN songs s ON a.song_id = s.id
        WHERE a.playlist_id = $1
        ORDER BY a.time ASC
      `,
            values: [playlistId],
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new NotFoundError('Tidak ada aktivitas kolaborasi ditemukan')
        }
        return result.rows.map(({ username, title, action, time }) => ({ username, title, action, time }))
    }

    async addCollaborationActivity(playlistId, songId, userId, action) {
        const id = nanoid(16)
        const query = {
            text: 'INSERT INTO playlist_song_activities (id, playlist_id, song_id, user_id, action, time) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id',
            values: [id, playlistId, songId, userId, action],
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new InvariantError('Aktivitas kolaborasi gagal ditambahkan')
        }
        return result.rows[0].id
    }

    async deleteCollaborationActivity(playlistId, songId, userId, action) {
        const query = {
            text: 'DELETE FROM playlist_song_activities WHERE playlist_id = $1 AND song_id = $2 AND user_id = $3 AND action = $4 RETURNING id',
            values: [playlistId, songId, userId, action],
        }
        const result = await this._pool.query(query)
        if (!result.rows.length) {
            throw new InvariantError('Aktivitas kolaborasi gagal dihapus')
        }
    }
}

module.exports = CollaborationsService
