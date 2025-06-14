require('dotenv').config()
const Hapi = require('@hapi/hapi')

const albums = require('./api/albums')
const AlbumsService = require('./services/postgres/AlbumsService')
const AlbumsValidator = require('./validator/albums')

const songs = require('./api/songs')
const SongsService = require('./services/postgres/SongsService')
const SongsValidator = require('./validator/songs')
const ClientError = require('./exceptions/ClientError')

const init = async () => {
    const albumsService = new AlbumsService()
    const songsService = new SongsService()
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    })

    await server.register([
        {
            plugin: albums,
            options: {
                service: albumsService,
                validator: AlbumsValidator,
            },
        },
        {
            plugin: songs,
            options: {
                service: songsService,
                validator: SongsValidator,
            },
        },
    ])

    server.ext('onPreResponse', (request, h) => {
        const { response } = request
        console.log(response)
        if (response instanceof Error) {
            if (response instanceof ClientError) {
                const newResponse = h.response({
                    status: 'fail',
                    message: response.message,
                })
                newResponse.code(response.statusCode)
                return newResponse
            }

            if (!response.isServer) {
                return h.continue
            }

            const newResponse = h.response({
                status: 'error',
                message: 'Terjadi kegagalan pada server kami.',
            })
            newResponse.code(500)
            return newResponse
        }

        return h.continue
    })

    await server.start()
    console.log(`Server berjalan pada ${server.info.uri}`)
}

init()
