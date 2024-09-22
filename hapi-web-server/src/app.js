const routes = require('./routes');
const { init } = require('./server');

const startServer = async () => {
    try {
        const server = await init(); // Get the server instance
        server.route(routes);         // Register the routes
        await server.start();         // Start the server
        console.log(`Server berjalan pada ${server.info.uri}`);
    } catch (err) {
        console.error('Server failed to start:', err);
    }
};

startServer();
