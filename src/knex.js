const knex = require( 'knex' )( {

    client: 'mysql',
    connection: {

        host: 'localhost',

        user: 'root',
        password: 'rootuser',

        database: 'hapi_db',
        charset: 'utf8',

    }

} );

module.exports = knex;