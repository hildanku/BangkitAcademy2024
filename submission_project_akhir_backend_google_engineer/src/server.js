const Hapi = require('@hapi/hapi');

const init = async () => {

  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  });

  await server.start()
  console.log(`server running at port ${server.info.uri}`);
}

init();

