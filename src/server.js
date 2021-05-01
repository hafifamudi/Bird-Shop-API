const hapi = require('@hapi/hapi');
const routes = require('./routes');
const key = require('../config');
const validate = require('./auth');

const init = async () => {
    const server = hapi.server({
        port: 5000,
        host: 'localhost',
        routes:   {
            cors: {
                origin: ['*'],
            },
        },
    });

    // create this callback for make sure the authentication module has module before attach the route
    routes.forEach(route => {
        console.log(`attaching ${route.path}`);
        server.route(route);
    })

    // jwt config
    await server.register(require('hapi-auth-jwt2'));
    server.auth.strategy('jwt', 'jwt',
    { 
      key, 
      validate
    });
    // all route required token
    server.auth.default('jwt');

    await server.start();
    
    return server;
};

init().then(server => {
    console.log(`Server running at: ${server.info.uri}`);
}).catch(err => {
    console.log(err);
});