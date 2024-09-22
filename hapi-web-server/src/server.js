const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    return server;
    // await server.start();
    // console.log(`Server berjalan pada ${server.info.uri}`);
}

module.exports = { init };