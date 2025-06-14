/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
    pgm.createTable('playlist_song_activities', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
        },
        playlist_id: {
            type: 'VARCHAR(50)',
            references: 'playlists(id)',
            onDelete: 'cascade',
        },
        song_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'songs(id)',
        },
        user_id: {
            type: 'VARCHAR(50)',
            notNull: true,
            references: 'users(id)',
        },
        action: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        time: {
            type: 'TIMESTAMP',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
}
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
    pgm.dropTable('playlist_song_activities')
}

